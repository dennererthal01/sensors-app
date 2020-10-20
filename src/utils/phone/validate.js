import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default function validatePhone(number) {
    const phoneNumber = parsePhoneNumberFromString(number)
    return !!phoneNumber && phoneNumber.isValid()
}
