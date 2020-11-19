import React from 'react'
import { observer } from 'mobx-react-lite'

import { Text } from '@ui-kitten/components'

import Alert from '../../models/Alert'

export default observer(({ viewState }) => {
    const { alert, appState } = viewState
    const { device, sensor, operator, value } = alert
    const { devices, sensors } = appState

    if (!device || !sensor || !operator || (!value && value !== 0)) {
        return null
    }

    const selectedSensor = sensors.find(existingSensor => existingSensor.id === sensor) 
    const selectedDevice = devices.find(existingDevice => existingDevice.id === device) 

    return (
        <Text>
            {`O alerta será ativado quando o valor do sensor "${selectedSensor.name}" no dispositivo "${selectedDevice.name}" for ${Alert.OperatorLabels[operator]} ${value}`}
        </Text>
    )
})