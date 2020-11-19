/* eslint-disable global-require */
import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ScrollView } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'

import AppState from '../../../AppState'

import Container from '../../../components/Container'

import LastMeasures from './LastMeasures'
import Query from './Query'
import Tabs from './Tabs'

let styles

const sensors = {
    Temperatura: {
        card: '#EE6969',
        value: '#C34E4E',
        parse: value => (
            <Text style={styles.valueText}>
                {parseInt(value)}
            </Text>
        )
    },
    Umidade: {
        card: '#3FD761',
        value: '#45A85B',
        parse: value => (
            <Text style={styles.valueText}>
                {parseInt(value)}
            </Text>
        )
    },
    Luminosidade: {
        card: '#5891E7',
        value: '#3571CB',
        parse: value => (
            <Text style={styles.valueText}>
                {parseInt((value * 100) / 1033)}
            </Text>
        )
    },
    Gabinete: {
        card: '#ffd966',
        value: '#d6b12b',
        parse: value => {
            const open = parseInt(value, 10) === 0
            return (
                <Icon
                    style={{ width: 50, height: 50 }}
                    fill='#ffffff'
                    name={open ? 'unlock-outline' : 'lock-outline'}
                />
            )
        }
    }
}

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const [selectedTab, setSelectedTab] = useState(0)

    const { activeDevice } = appState

    const goToActiveDevices = () => {
        navigation.navigate('ChooseActiveDevice')
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Button size="medium" appearance="ghost" onPress={goToActiveDevices}>
                    {activeDevice ? activeDevice.name : 'Nenhum dispositivo selecionado'}
                </Button>
                <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {selectedTab === 0 && (
                    <LastMeasures sensorConfig={sensors} />
                )}
                {selectedTab === 1 && (
                    <Query sensorConfig={sensors} />
                )}
            </ScrollView>
        </Container>
    )
})

styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    valueText: {
        color: '#fff',
        fontSize: 48,
    },
}
