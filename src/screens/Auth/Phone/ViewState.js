import catchError from '../../../utils/error/catch'
import { sendPin } from '../../../utils/firebase'

export default () => ({
    countryCode: '+55',
    phone: '',
    signingUp: false,
    async signUp(recaptcha) {
        this.signingUp = true
        let result
        try {
            result = await sendPin(this.normalizedPhone, recaptcha)
        } catch (e) {
            catchError(e, 'unknown')
            result = false
        } finally {
            this.signingUp = false
        }
        return result
    },
    get normalizedPhone() {
        return `${this.countryCode}${this.phone}`
    },
})
