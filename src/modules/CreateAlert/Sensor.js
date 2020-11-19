import React from 'react'
import { observer } from 'mobx-react-lite'

import { IndexPath, Select, SelectItem } from '@ui-kitten/components'

export default observer(({ viewState }) => {
    const { alert, isNewAlert, appState } = viewState
    const { sensors } = appState
    const { sensor } = alert

    const selectedSensor = sensors.find(existingSensor => existingSensor.id === sensor) 
    const selectedIndex = sensors.findIndex(existingSensor => existingSensor.id === sensor)

    const onSelectSensor = (indexPath) => {
        alert.sensor = sensors[indexPath.row].id
    }

    return (
        <Select
            disabled={!isNewAlert}
            label='Sensor'
            size='large'
            placeholder='Selecionar sensor'
            selectedIndex={selectedIndex >= 0 ? new IndexPath(selectedIndex) : undefined}
            onSelect={onSelectSensor}
            value={selectedIndex >= 0 ? selectedSensor.name : 'Nenhum sensor selecionado'}
            style={{ marginBottom: 10 }}>
            {sensors.map(existingSensor => (
                <SelectItem title={existingSensor.name} />
            ))}
        </Select>
    )
})
