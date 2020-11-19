import { observable, decorate } from 'mobx'

import Model from './Model'

class Measure extends Model {
    device

    sensor

    value

    date

    constructor() {
        super('measures')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.device = data.device
        this.sensor = data.sensor
        this.value = data.value
        this.date = data.date
    }

    toJSON() {
        return {
            ...super.toJSON(),
            device: this.device,
            sensor: this.sensor,
            value: this.value,
            date: this.date,
        }
    }
}

decorate(Measure, {
    sensor: observable,
    device: observable,
    value: observable,
    date: observable,
})

export default Measure
