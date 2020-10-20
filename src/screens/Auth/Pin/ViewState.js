import { verifyPin } from '../../../utils/firebase'

export default ({ appState, verificationId }) => ({
    pin: '',
    error: '',
    signingIn: false,
    async signIn() {
        let success
        this.signingIn = true
        try {
            const credentials = await verifyPin(this.pin, verificationId)
            await appState.login(credentials)
            success = true
        } catch (e) {
            this.error = e.message === 'invalid_pin' ? 'invalidPin' : 'unknown'
            success = false
        } finally {
            this.signingIn = false
        }
        return success
    },
    get canSignIn() {
        return this.pin.length === 6
    },
})
