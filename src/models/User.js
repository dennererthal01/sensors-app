import { observable, decorate } from 'mobx'

import Model from './Model'

class User extends Model {
    phone

    name

    pushToken

    email

    devices = []

    onboarded = false

    constructor() {
        super('users')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.phone = data.phone
        this.name = data.name
        this.pushToken = data.pushToken
        this.email = data.email
        this.devices = data.devices
        this.onboarded = data.onboarded
    }

    toJSON() {
        return {
            ...super.toJSON(),
            phone: this.phone,
            name: this.name,
            pushToken: this.pushToken,
            email: this.email,
            devices: this.devices,
            onboarded: this.onboarded,
        }
    }
}

decorate(User, {
    phone: observable,
    name: observable,
    pushToken: observable,
    email: observable,
    devices: observable,
    onboarded: observable,
})

export default User
