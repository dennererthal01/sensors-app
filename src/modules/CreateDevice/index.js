/* eslint-disable global-require */
import React, { useContext, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View } from 'react-native'

import AppState from '../../AppState'

import Container from '../../components/Container'
import Working from '../../components/Working'

import Header from './Header'
import Name from './Name'
import Token from './Token'
import Delete from './Delete'
import ViewState from './ViewState'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const deviceId = navigation.getParam('deviceId')

    const viewState = useLocalStore(ViewState, { appState, deviceId })

    useEffect(() => {
        viewState.init()
    }, [viewState])

    return (
        <Container style={styles.container}>
            <Working visible={viewState.saving} />
            <Header viewState={viewState} />
            <View style={styles.content}>
                <Name viewState={viewState} />
                <Token viewState={viewState} />
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
