import React, { useContext, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View } from 'react-native'
import { Datepicker, Spinner, Text } from '@ui-kitten/components'

import AppState from '../../../../AppState'

import Charts from './Charts'
import ViewState from './ViewState'

let styles

export default observer(({ sensorConfig }) => {
    const appState = useContext(AppState)

    const viewState = useLocalStore(ViewState, { appState, sensorConfig })

    useEffect(() => {
        viewState.init()
    }, [viewState])

    const { date, fetching, hasMeasures } = viewState

    return (
        <View style={styles.container}>
            <Datepicker
                date={date}
                onSelect={viewState.updateDate}
            />
            <View style={styles.content}>
                {fetching && (
                    <Spinner />
                )}
                {!fetching && !hasMeasures && (
                    <Text>
                        Sem resultados para este dia.
                    </Text>
                )}
                {!fetching && hasMeasures && (
                    <Charts viewState={viewState} />
                )}
            </View>
        </View>
    )
})

styles = {
    container: {
        marginTop: 20,
    },
    content: {
        marginTop: 20,
        alignItems: 'center'
    }
}