import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { View } from 'react-native'

import AppState from '../../../../AppState'

import Measure from './Measure'

let styles

export default observer(({ sensorConfig }) => {
    const appState = useContext(AppState)

    return (
        <View style={styles.container}>
            {appState.lastMeasures.map((lastMeasure, index) => (
                <Measure
                    key={lastMeasure.id}
                    sensorConfig={sensorConfig}
                    measure={lastMeasure}
                    last={index === appState.lastMeasures.length - 1}
                />
            ))}
        </View>
    )
})

styles = {
    container: {
        marginTop: 20,
    }
}