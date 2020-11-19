/* eslint-disable global-require */
import React, { useContext, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View } from 'react-native'

import AppState from '../../AppState'

import Container from '../../components/Container'
import Working from '../../components/Working'

import Header from './Header'
import Name from './Name'
import Device from './Device'
import Sensor from './Sensor'
import Operator from './Operator'
import Value from './Value'
import Description from './Description'
import Delete from './Delete'
import ViewState from './ViewState'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const alertId = navigation.getParam('alertId')

    const viewState = useLocalStore(ViewState, { appState, alertId })

    useEffect(() => {
        viewState.init()
    }, [viewState])

    return (
        <Container style={styles.container}>
            <Working visible={viewState.saving} />
            <Header viewState={viewState} />
            <View style={styles.content}>
                <Name viewState={viewState} />
                <Device viewState={viewState} />
                <Sensor viewState={viewState} />
                <Operator viewState={viewState} />
                <Value viewState={viewState} />
                <Description viewState={viewState} />
                <Delete viewState={viewState} />
            </View>
        </Container>
    )
})

styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    content: {
        marginTop: 30,
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 5,
    },
    spacer: {
        flexGrow: 1,
    }
}
