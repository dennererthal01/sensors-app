import React from 'react'
import { observer } from 'mobx-react-lite'
import { withNavigation } from 'react-navigation'

import { Alert } from 'react-native'
import { Button } from '@ui-kitten/components'

let styles

const Delete = observer(({ viewState, navigation }) => {
    const { isNewDevice } = viewState

    const deleteDevice = async () => {
        await viewState.delete()
        navigation.goBack(null)
    }

    const showDeleteAlert = () => {
        Alert.alert(
            'Atenção',
            'Tem certeza que deseja excluir este dispositivo? Esta ação não pode ser revertida.',
            [
              {
                text: 'Cancelar',
                style: "cancel"
              },
              {
                text: 'Sim, excluir',
                onPress: deleteDevice,
                style: "destructive"
              },
            ],
            { cancelable: true }
        );
    }

    if (isNewDevice) {
        return null
    }

    return (
        <Button status='danger' style={styles.button} onPress={showDeleteAlert}>
            Excluir
        </Button>
    )
})

styles = {
    button: {
        marginTop: 50,
    }
}

export default withNavigation(Delete)