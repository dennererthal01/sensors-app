import * as firebase from 'firebase'
import dayjs from 'dayjs'

import Measure from '../../../../models/Measure'

export default ({ appState, sensorConfig }) => ({
    sensorConfig,
    appState,
    date: new Date(),
    fetching: true,
    measures: {},

    async init() {
        this.load()
    },

    updateDate(date) {
        this.date = date
        this.load()
    },

    async load() {
        const { activeDevice, sensors } = appState
        this.fetching = true
        try {
            await Promise.all(Object.keys(sensorConfig).map(async sensorName => {
                const sensorFound = sensors.find(sensor => sensorName === sensor.name)
                if (!sensorFound) {
                    return true
                }
                this.measures[sensorName] = await Measure.query('measures', [
                    ['sensor', '==', sensorFound.id],
                    ['device', '==', activeDevice.id],
                    ['date', '>=', firebase.firestore.Timestamp.fromDate(dayjs(this.date).startOf('day').toDate())],
                    ['date', '<=', firebase.firestore.Timestamp.fromDate(dayjs(this.date).endOf('day').toDate())],
                ], Measure)
            }))
        } catch (e) {
            console.log(e)
            // i dont care
        } finally {
            this.fetching = false
        }
    },

    get hasMeasures() {
        return Object.keys(this.measures).filter(sensor => this.measures[sensor] && this.measures[sensor].length > 1).length > 1
    }
})