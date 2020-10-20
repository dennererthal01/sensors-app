import React, { useContext } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View, ScrollView, Image } from 'react-native'
import { Button, Text, withStyles } from '@ui-kitten/components'

import AppState from '../../../AppState'

import Input from '../../../components/Input'
import Container from '../../../components/Container'
import Working from '../../../components/Working'

import ViewState from './ViewState'

let styles

const Name = observer(({ navigation }) => {
    const appState = useContext(AppState)

    const viewState = useLocalStore(ViewState, { appState })

    const { currentUser, saving, canSave } = viewState

    const { name } = currentUser

    const onChangeName = (value) => {
        currentUser.name = value
    }

    const saveChanges = async () => {
        const result = await viewState.save()
        if (result) {
            navigation.navigate('Application')
        }
    }

    return (
        <Container style={styles.container}>
            <Working visible={saving} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Image
                    // eslint-disable-next-line global-require
                    source={require('../../../../assets/images/icon.png')}
                    style={styles.icon}
                />
                <Text category="s1">Bem-vindo ao Sensors!</Text>
                <Text category="s2">Informe seus dados pessoais no formulário abaixo</Text>
                <Input
                    label="Nome"
                    value={name}
                    onChangeText={onChangeName}
                    editable={!saving}
                    style={styles.input}
                    size="large"
                />
                <View style={styles.footer}>
                    <Button
                        disabled={!canSave || saving}
                        onPress={saveChanges}
                        loading={saving}
                        size="giant">
                        Confirmar
                    </Button>
                </View>
            </ScrollView>
        </Container>
    )
})

styles = {
    container: {
        flexGrow: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        alignSelf: 'center',
        height: 128,
        resizeMode: 'contain',
        marginBottom: 25,
    },
    input: {
        marginTop: 10,
    },
    footer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
}

export default withStyles(Name)
