import React from 'react'
import { observer } from 'mobx-react-lite'
import { withNavigation } from 'react-navigation'

import { TopNavigation } from '@ui-kitten/components'

import HeaderButton from '../../components/HeaderButton'

const Header = observer(({ navigation, viewState }) => {
    const { saving, isValid, isNewAlert } = viewState

    const goBack = () => {
        navigation.goBack(null)
    }

    const save = async () => {
        if (isValid) {
            await viewState.save()
            goBack()
        }
    }

    const renderLeftControl = () => (
        <HeaderButton onPress={goBack} disabled={saving}>
            Fechar
        </HeaderButton>
    )

    const renderRightControl = () => (
        <HeaderButton onPress={save} disabled={!isValid || saving}>
            {isNewAlert ? 'Criar' : 'Salvar'}
        </HeaderButton>
    )

    return (
        <TopNavigation
            title={isNewAlert ? 'Novo alerta' : 'Editar alerta'}
            alignment="center"
            accessoryLeft={renderLeftControl}
            accessoryRight={renderRightControl}
        />
    )
})

export default withNavigation(Header)