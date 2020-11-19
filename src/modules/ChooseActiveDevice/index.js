import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components'
import { View } from 'react-native'

import AppState from '../../AppState'

import Container from '../../components/Container'

import Header from './Header'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(appState.getActiveDeviceIndex()))

    const onSelect = (index) => {
        appState.setActiveDevice(appState.devices[index.row])
        setSelectedIndex(index)
        navigation.goBack(null)
    }

    return (
        <Container style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Drawer
                    selectedIndex={selectedIndex}
                    onSelect={onSelect}>
                    {appState.devices.map(device => (
                        <DrawerItem key={device.id} title={device.name} />
                    ))}
                </Drawer>
            </View>
        </Container>
    )
})

styles = {
    container: {
        flexGrow: 1,
        marginHorizontal: 10,
    },
    content: {
        marginTop: 30,
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 5,
    },
}
