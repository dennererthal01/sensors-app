import { createContext } from 'react'
import * as mobx from 'mobx'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import Model from './models/Model'
import User from './models/User'
import Device from './models/Device'
import Sensor from './models/Sensor'
import Alert from './models/Alert'
import LastMeasure from './models/LastMeasure'

import { init, signIn, logout } from './utils/firebase'

const { observable, decorate } = mobx

class AppState {
    loading = true

    currentUser

    devices = []

    sensors = []

    alerts = []

    lastMeasures = []

    activeDevice

    activatingDevice = false

    async init() {
        if (this.loading) {
            this.currentUser = new User()
            try {
                const user = await init()
                await this.loadCurrentUser(user.uid, user.phoneNumber)
            } catch (e) {
                // noop
            }
            this.loading = false
        }
    }

    async loadCurrentUser(id, phone) {
        const loadResult = await this.currentUser.load(id)
        if (!loadResult) {
            this.currentUser.phone = phone
            const saveResult = await this.currentUser.save()
            await this.loadCurrentUserData()
            return saveResult
        }
        await this.loadCurrentUserData()
        return true
    }

    async loadCurrentUserData() {
        let token
        try {
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
                let finalStatus = existingStatus
                if (existingStatus !== 'granted') {
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                    finalStatus = status
                }
                if (finalStatus !== 'granted') {
                    console.log('failed to get push token')
                    return
                }
                token = (await Notifications.getExpoPushTokenAsync()).data
                if (token) {
                    this.currentUser.pushToken = token
                    await this.currentUser.update()
                }
            }
    
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                })
            }
        } catch (e) {
            // do nothing
        }

        const { devices = [] } = this.currentUser
        const loadedDevices = []
        await Promise.all(devices.map(async deviceId => {
            const device = new Device()
            if (await device.load(deviceId)) {
                loadedDevices.push(device)
            }
        }))
        this.devices = loadedDevices
        this.sensors = await Model.query('sensors', [], Sensor)
        this.alerts = await Model.query('alerts', [], Alert)
        this.alerts.replace(
            this.alerts.filter(alert => !!this.devices.find(device => device.id === alert.device))
        )
        if (loadedDevices.length) {
            this.setActiveDevice(loadedDevices[0])
        }
    }

    async login(credentials) {
        const result = await signIn(credentials)
        if (result?.user) {
            const { user } = result
            await this.loadCurrentUser(user.uid, user.phoneNumber)
        }
    }

    async logout() {
        await logout()
        this.currentUser = new User()
        return true
    }

    async setActiveDevice(device) {
        this.activatingDevice = true
        try {
            this.lastMeasures = []
            this.activeDevice = device
            await this.watchActiveDeviceLastMeasures()
        } catch (e) {
            // ignore
        } finally {
            this.activatingDevice = false
        }
    }

    async watchActiveDeviceLastMeasures() {
        this.lastMeasures = await Model.query('last_measures', [['device', '==', this.activeDevice.id]], LastMeasure)
        this.lastMeasures.forEach(lastMeasure => lastMeasure.watch())
    }

    getActiveDeviceIndex() {
        if (!this.devices.length || !this.activeDevice) {
            return -1
        }
        return this.devices.findIndex(device => device.id === this.activeDevice.id)
    }
}

decorate(AppState, {
    loading: observable,
    currentUser: observable,
    devices: observable,
    sensors: observable,
    alerts: observable,
    activeDevice: observable,
    activatingDevice: observable,
    lastMeasures: observable,
})

export default createContext(new AppState())
