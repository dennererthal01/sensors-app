
import React from 'react'
import { observer } from 'mobx-react-lite'

import { Input, Button } from '@ui-kitten/components'

export default observer(({ viewState }) => {
    const { device, saving } = viewState
    const { token } = device

    const generateNewToken = () => {
        device.token = viewState.generateToken()
    }

    return (
        <>
            <Input
                label='Token de autenticação'
                value={token}
                editable={false}
                disabled
                size="large"
            />
            <Button
                style={{ width: 170, marginLeft: -22 }}
                disabled={saving}
                onPress={generateNewToken}
                size="medium"
                appearance="ghost">
                Gerar outro token
            </Button>
        </>
    )
})