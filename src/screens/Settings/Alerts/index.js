/* eslint-disable global-require */
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { View, TouchableOpacity } from 'react-native'
import { Divider, Icon, List, ListItem } from '@ui-kitten/components'

import AppState from '../../../AppState'

import Container from '../../../components/Container'

import Header from './Header'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)

    const { alerts } = appState

    const data = alerts.concat([{
        label: 'Novo alerta',
        id: 'new'
    }])

    const goToCreateAlert = (alertId) => {
        navigation.navigate('CreateAlert', { alertId })
    }

    const renderItemAccessory = (icon, alertId) => (style) => {
        if (icon === 'settings-outline') {
            return (
                <TouchableOpacity onPress={() => goToCreateAlert(alertId)}>
                    <Icon {...style} name={icon} />     
                </TouchableOpacity>
            )
        }

        return <Icon {...style} name={icon} />
    }
    
    const renderItemIcon = (icon) => (style) => (
        <Icon {...style} name={icon} />
    )
    
    const renderItem = ({ item, index }) => {
        if (index === data.length - 1) {
            return (
                <ListItem
                    onPress={goToCreateAlert}
                    title={item.label}
                    accessoryLeft={renderItemIcon('plus-outline')}
                    accessoryRight={renderItemAccessory('arrow-forward-outline')}
                /> 
            )
        }
        return (
            <ListItem
                title={item.name}
                description={'Device here'}
                accessoryLeft={renderItemIcon('alert-triangle-outline')}
                accessoryRight={renderItemAccessory('settings-outline', item.id)}
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
