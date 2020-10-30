/* eslint-disable global-require */
import React, { useContext } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Text, Button } from '@ui-kitten/components'

import Input from '../../../components/Input'
import Container from '../../../components/Container'
import Working from '../../../components/Working'

import AppState from '../../../AppState'

import Errors from '../../../utils/error/errors'

import ViewState from './ViewState'

let styles

export default observer(({ navigation }) => {
    const appState = useContext(AppState)
    const verificationId = navigation.getParam('verificationId')

    const viewState = useLocalStore(ViewState, { appState, verificationId })

    const { pin, signingIn, canSignIn, error } = viewState

    const onChangePin = (value) => {
        viewState.pin = value
    }

    const signIn = async () => {
        const result = await viewState.signIn()
        if (result) {
            if (!appState.currentUser.onboarded) {
                navigation.navigate('Onboarding')
            } else {
                navigation.navigate('Application')
            }
        }
    }

    const onNoPinPressed = () => {
        navigation.goBack()
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <KeyboardAvoidingView behavior="position">
                    <Working visible={signingIn} />
                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={require('../../../../assets/images/icon.png')}
                        />
                        <Text category="s1" style={styles.title}>
                            Insira abaixo o código de verificação de seis dígitos recebido por SMS:
                        </Text>
                    </View>
                    <Input
                        placeholder="Código de verificação"
                        style={styles.input}
                        value={pin}
                        onChangeText={onChangePin}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        editable={!signingIn}
                        size="large"
                    />
                    {!!error && (
                        <Text status="danger" style={styles.error}>
                            {Errors[error]}
                        </Text>
                    )}
                    <View style={styles.footer}>
                        <Button
                            disabled={!canSignIn || signingIn}
                            onPress={signIn}
                            loading={signingIn}
                            size="giant">
                            Confirmar
                        </Button>
                        <Button
                            disabled={signingIn}
                            style={styles.pinButton}
                            onPress={onNoPinPressed}
                            size="giant"
                            appearance="ghost">
                            Não recebeu o SMS?
                        </Button>
                    </View>
                </KeyboardAvoidingView>
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
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
    },
    logo: {
        height: 96,
        width: 96,
    },
    footer: {
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        marginTop: 15,
        marginBottom: 10,
    },
    error: {
        textAlign: 'center',
    },
    pinButton: {
        marginTop: 2,
    },
}
