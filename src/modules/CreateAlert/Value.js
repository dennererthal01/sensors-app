
import React from 'react'
import { observer } from 'mobx-react-lite'

import { Input } from '@ui-kitten/components'

export default observer(({ viewState }) => {
    const { alert, saving } = viewState
    const { value } = alert

    const onChangeValue = newValue => {
        const parsedValue = parseInt(newValue, 10)
        alert.value = isNaN(parsedValue) ? 0 : parsedValue
    }

    return (
        <Input
            keyboardType='number-pad'
            style={{ marginBottom: 10 }}
            label='Valor'
            value={`${value || 0}`}
            onChangeText={onChangeValue}
            editable={!saving}
            size="large"
        />
    )
})