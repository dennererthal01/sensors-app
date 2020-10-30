import { observable, decorate } from 'mobx'

import Model from './Model'

class Device extends Model {
    name

    token

    createdBy

    constructor() {
        super('devices')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.name = data.name
        this.token = data.token
        this.createdBy = data.createdBy
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            token: this.token,
            createdBy: this.createdBy
        }
    }
}

decorate(Device, {
    name: observable,
    token: observable,
    createdBy: observable,
})

export default Device
