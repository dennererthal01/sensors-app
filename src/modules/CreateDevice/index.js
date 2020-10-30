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
import ViewState from './ViewState'

let styles

export default observer(() => {
    const appState = useContext(AppState)

    const viewState = useLocalStore(ViewState, { appState })

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
}
