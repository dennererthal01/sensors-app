import React from 'react'
import { observer } from 'mobx-react-lite'

import { IndexPath, Select, SelectItem } from '@ui-kitten/components'

export default observer(({ viewState }) => {
    const { alert, isNewAlert, appState } = viewState
    const { devices } = appState
    const { device } = alert

    const selectedDevice = devices.find(existingDevice => existingDevice.id === device) 
    const selectedIndex = devices.findIndex(existingDevice => existingDevice.id === device)

    const onSelectDevice = (indexPath) => {
        alert.device = devices[indexPath.row].id
    }

    return (
        <Select
            disabled={!isNewAlert}
            label='Dispositivo'
            size='large'
            placeholder='Selecionar dispositivo'
            selectedIndex={selectedIndex >= 0 ? new IndexPath(selectedIndex) : undefined}
            onSelect={onSelectDevice}
            value={selectedIndex >= 0 ? selectedDevice.name : 'Nenhum dispositivo selecionado'}
            style={{ marginBottom: 10 }}>
            {devices.map(existingDevice => (
                <SelectItem title={existingDevice.name} />
            ))}
        </Select>
    )
})
