import catchError from '../../utils/error/catch'

import Device from '../../models/Device'

export default ({ appState }) => ({
    device: new Device(),
    saving: false,
    init() {
        this.device.token = this.generateToken()
        this.device.createdBy = appState.currentUser.id
    },

    generateToken() {
        const rand = () => Math.random().toString(36).substr(2)
        return rand() + rand()
    },

    get isValid() {
        return !!this.device.name
    },

    async save() {
        this.saving = true
        try {
            if (await this.device.save()) {
                appState.devices.push(this.device)
            }
        } catch (e) {
            catchError(e)
        } finally {
            this.saving = false
        }
    }
})