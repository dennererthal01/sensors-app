import { observable, decorate } from 'mobx'

import Model from './Model'

class LastMeasure extends Model {
    device

    sensor

    value

    constructor() {
        super('last_measures')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.device = data.device
        this.sensor = data.sensor
        this.value = data.value
    }

    toJSON() {
        return {
            ...super.toJSON(),
            device: this.device,
            sensor: this.sensor,
            value: this.value
        }
    }
}

decorate(LastMeasure, {
    sensor: observable,
    device: observable,
    value: observable,
})

export default LastMeasure
