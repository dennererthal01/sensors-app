import { createContext } from 'react'
import * as mobx from 'mobx'

import Model from './models/Model' 
import User from './models/User'
import Device from './models/Device'

import { init, signIn, logout } from './utils/firebase'

const { observable, decorate } = mobx

class AppState {
    loading = true

    currentUser

    devices = []

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
        const { devices = [] } = this.currentUser
        const loadedDevices = []
        await Promise.all(devices.map(async deviceId => {
            const device = new Device()
            if (await device.load(deviceId)) {
                loadedDevices.push(device)
            }
        }))
        this.devices = loadedDevices
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
}

decorate(AppState, {
    loading: observable,
    currentUser: observable,
    devices: observable,
})

export default createContext(new AppState())
