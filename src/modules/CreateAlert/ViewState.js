import catchError from '../../utils/error/catch'

import Alert from '../../models/Alert'

export default ({ appState, alertId }) => ({
    appState,
    alert: new Alert(),
    saving: false,
    init() {
        const existingAlert = !!alertId && appState.alerts.find(alert => alert.id === alertId)
        if (existingAlert) {
            this.alert = existingAlert
        }
    },

    get isValid() {
        return !!this.alert.name
            && !!this.alert.device
            && !!this.alert.sensor
            && !!this.alert.operator
            && (!!this.alert.value || this.alert.value === 0)
    },

    get isNewAlert() {
        return !this.alert.id  
    },

    async save() {
        this.saving = true
        try {
            const isNew = this.isNewAlert
            if (await this.alert.save()) {
                if (isNew) {
                    appState.alerts.push(this.alert)
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
            if (await this.alert.remove()) {
                appState.alerts.replace(
                    appState.alerts.filter(alert => alert.id !== this.alert.id)
                )
            }
        } catch (e) {
            catchError(e)
        } finally {
            this.saving = false
        }
    }
})