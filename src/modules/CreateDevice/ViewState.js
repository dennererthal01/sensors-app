import catchError from '../../utils/error/catch'

import Device from '../../models/Device'

export default ({ appState, deviceId }) => ({
    device: new Device(),
    saving: false,
    init() {
        const existingDevice = !!deviceId && appState.devices.find(device => device.id === deviceId)
        if (existingDevice) {
            this.device = existingDevice
        } else {
            this.device.token = this.generateToken()
            this.device.createdBy = appState.currentUser.id
        }
    },

    generateToken() {
        const rand = () => Math.random().toString(36).substr(2)
        return rand() + rand()
    },

    get isValid() {
        return !!this.device.name
    },

    get isNewDevice() {
        return !this.device.id  
    },

    async save() {
        this.saving = true
        try {
            const isNew = this.isNewDevice
            if (await this.device.save()) {
                if (isNew) {
                    appState.devices.push(this.device)
                    if (!appState.activeDevice) {
                        appState.activeDevice = this.device
                    }
                }
            }
        } catch (e) {
            catchError(e)
        } finally {
            this.saving = false
        }
    },

    async delete() {
        this.saving = true
        try {
            if (await this.device.remove()) {
                appState.devices.replace(
                    appState.devices.filter(device => device.id !== this.device.id)
                )
                if (appState.activeDevice.id === this.device.id) {
                    appState.setActiveDevice(appState.devices[0])
                }
            }
        } catch (e) {
            catchError(e)
        } finally {
            this.saving = false
        }
    }
})