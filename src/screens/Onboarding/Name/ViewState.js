import catchError from '../../../utils/error/catch'

export default ({ appState }) => ({
    currentUser: appState.currentUser,
    saving: false,

    get canSave() {
        const { name } = this.currentUser
        return typeof name === 'string' && !!name.trim()
    },

    async save() {
        this.saving = true
        let saveResult

        try {
            this.currentUser.onboarded = true
            saveResult = await this.currentUser.update()
        } catch (e) {
            catchError(e, 'unknown')
            saveResult = false
        } finally {
            this.saving = false
        }

        return saveResult
    },
})
