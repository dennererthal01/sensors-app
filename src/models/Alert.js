import { observable, decorate } from 'mobx'

import Model from './Model'

class Alert extends Model {
    name

    sensor

    device

    operator

    value

    static Operators = [
        '<',
        '<=',
        '=',
        '>=',
        '>',
        '!='
    ]

    static OperatorLabels = {
        '<': 'Menor (<) que',
        '<=': 'Menor ou igual (<=) a',
        '=': 'Igual (=) a',
        '>=': 'Maior ou igual (>=) a',
        '>': 'Maior (>) que',
        '!=': 'Diferente (!=) de',
    }

    constructor() {
        super('alerts')
    }

    fromJSON(data) {
        super.fromJSON(data)
        this.name = data.name
        this.sensor = data.sensor
        this.device = data.device
        this.operator = data.operator
        this.value = data.value
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            sensor: this.sensor,
            device: this.device,
            operator: this.operator,
            value: this.value,
        }
    }
}

decorate(Alert, {
    name: observable,
    sensor: observable,
    device: observable,
    operator: observable,
    value: observable,
})

export default Alert
