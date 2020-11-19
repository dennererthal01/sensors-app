import React from 'react'
import { observer } from 'mobx-react-lite'

import { IndexPath, Select, SelectItem } from '@ui-kitten/components'

import Alert from '../../models/Alert'

export default observer(({ viewState }) => {
    const { alert } = viewState
    const { operator } = alert

    const selectedIndex = Alert.Operators.findIndex(oper => oper === operator)

    const onSelectOperator = (indexPath) => {
        alert.operator = Alert.Operators[indexPath.row]
    }

    return (
        <Select
            label='Operador'
            size='large'
            placeholder='Selecionar operador'
            selectedIndex={selectedIndex >= 0 ? new IndexPath(selectedIndex) : undefined}
            onSelect={onSelectOperator}
            value={selectedIndex >= 0 ? Alert.OperatorLabels[operator] : 'Nenhum operador selecionado'}
            style={{ marginBottom: 10 }}>
            {Alert.Operators.map(existingOperator => (
                <SelectItem title={Alert.OperatorLabels[existingOperator]} />
            ))}
        </Select>
    )
})
