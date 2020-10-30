/* eslint-disable global-require */
import React from 'react'
import { observer } from 'mobx-react-lite'

import { View } from 'react-native'
import { Divider, Icon, List, ListItem } from '@ui-kitten/components'

import Container from '../../../components/Container'

let styles

const entries = [
    {
        route: 'Devices',
        label: 'Dispositivos',
        description: 'Adicionar, editar e remover dispositivos',
        icon: 'shake-outline'
    },
    {
        route: 'Alerts',
        label: 'Alertas',
        description: 'Adicionar, editar e remover alertas',
        icon: 'alert-triangle-outline'
    },
]

export default observer(({ navigation }) => {
    const goTo = route => () => {
        navigation.navigate(route)
    }

    const renderItemAccessory = (style) => (
        <Icon {...style} name='arrow-forward-outline'/>
    )
    
    const renderItemIcon = (icon) => (style) => (
        <Icon {...style} name={icon} />
    )
    
    const renderItem = ({ item }) => (
        <ListItem
            onPress={goTo(item.route)}
            title={item.label}
            description={item.description}
            accessoryLeft={renderItemIcon(item.icon)}
            accessoryRight={renderItemAccessory}
        />
    )

    const keyExtractor = (item) => item.route

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <List
                    style={styles.list}
                    keyExtractor={keyExtractor}
                    data={entries}
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
