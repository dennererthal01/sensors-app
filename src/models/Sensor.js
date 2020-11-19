import { observable, decorate } from 'mobx'

import Model from './Model'

class Sensor extends Model {
    name

    unit

    constructor() {
        super('sensors')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.name = data.name
        this.unit = data.unit
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            unit: this.unit,
        }
    }
}

decorate(Sensor, {
    name: observable,
    unit: observable,
})

export default Sensor
