/* eslint-disable global-require */
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { View } from 'react-native'
import { Divider, Icon, List, ListItem } from '@ui-kitten/components'

import AppState from '../../../AppState'

import Container from '../../../components/Container'

import Header from './Header'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const { devices } = appState

    const data = devices.concat([{
        label: 'Novo dispositivo',
        id: 'new'
    }])

    const goToCreateDevice = () => {
        navigation.navigate('CreateDevice')
    }

    const renderItemAccessory = (icon) => (style) => (
        <Icon {...style} name={icon} />
    )
    
    const renderItemIcon = (icon) => (style) => (
        <Icon {...style} name={icon} />
    )
    
    const renderItem = ({ item, index }) => {
        if (index === data.length - 1) {
            return (
                <ListItem
                    onPress={goToCreateDevice}
                    title={item.label}
                    accessoryLeft={renderItemIcon('plus-outline')}
                    accessoryRight={renderItemAccessory('arrow-forward-outline')}
                /> 
            )
        }
        return (
            <ListItem
                title={item.name}
                description={item.token}
                accessoryLeft={renderItemIcon('shake-outline')}
                accessoryRight={renderItemAccessory('settings-outline')}
            />
        )
    }

    const keyExtractor = (item) => item.id

    return (
        <Container style={styles.container}>
            <Header />
            <View style={styles.content}>
                <List
                    style={styles.list}
                    keyExtractor={keyExtractor}
                    data={data}
                    extraData={data.slice()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Divider}
                />
            </View>
        </Container>
    )
})

styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        marginTop: 30,
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    list: {
        backgroundColor: 'white'
    }
}
