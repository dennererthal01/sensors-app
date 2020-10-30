import React from 'react'
import { observer } from 'mobx-react-lite'
import { withNavigation } from 'react-navigation'

import { TopNavigation } from '@ui-kitten/components'

import HeaderButton from '../../../components/HeaderButton'

const Header = observer(({ navigation }) => {
    const goBack = () => {
        navigation.goBack(null)
    }

    const renderLeftControl = () => (
        <HeaderButton onPress={goBack}>
            Voltar
        </HeaderButton>
    )

    return (
        <TopNavigation
            style={{ marginHorizontal: 10 }}
            title='Dispositivos'
            alignment="center"
            accessoryLeft={renderLeftControl}
        />
    )
})

export default withNavigation(Header)