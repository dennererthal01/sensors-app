import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { View } from 'react-native'
import { Text } from '@ui-kitten/components'

import AppState from '../../../../AppState'

let styles

export default observer(({ measure, last, sensorConfig }) => {
    const appState = useContext(AppState)

    const { sensors } = appState

    const sensor = sensors.find(sensor => measure.sensor === sensor.id)

    if (!sensor) {
        return null
    }

    return (
        <View style={styles.card(sensor.name, last, sensorConfig)}>
            <View style={styles.value(sensor.name, sensorConfig)}>
                {sensorConfig[sensor.name].parse(measure.value)}
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText}>
                    {sensor.name}
                </Text>
                <Text style={styles.unitText}>
                    {sensor.unit}
                </Text>
            </View>
        </View>
    )
})

styles = {
    card: (name, last, config) => ({
        width: '100%',
        backgroundColor: config[name].card,
        padding: 20,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: !last ? 20 : 0,
        borderRadius: 10,
    }),
    value: (name, sensorConfig) => ({
        width: 110,
        backgroundColor: sensorConfig[name].value,
        padding: 20,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    info: {
        marginLeft: 20,
    },
    infoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    unitText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold'
    }
}