
import React from 'react'
import { observer } from 'mobx-react-lite'

import { Input } from '@ui-kitten/components'

export default observer(({ viewState }) => {
    const { alert, saving } = viewState
    const { name = '' } = alert

    const onChangeName = value => {
        alert.name = value
    }

    return (
        <Input
            autoFocus
            style={{ marginBottom: 10 }}
            label='Nome'
            value={name}
            onChangeText={onChangeName}
            editable={!saving}
            size="large"
        />
    )
})