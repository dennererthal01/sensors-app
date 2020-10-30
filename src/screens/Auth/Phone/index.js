/* eslint-disable global-require */
import React, { useRef } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { View, Image, ScrollView } from 'react-native'
import { Text, Button } from '@ui-kitten/components'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import Container from '../../../components/Container'
import Working from '../../../components/Working'
import Input from '../../../components/Input'

import validatePhoneNumber from '../../../utils/phone/validate'
import config from '../../../utils/config'

import ViewState from './ViewState'

let styles

export default observer(({ navigation }) => {
    const viewState = useLocalStore(ViewState)
    const recaptchaVerifier = useRef(null)

    const { phone, countryCode, signingUp } = viewState

    const onChangePhoneNumber = (value) => {
        viewState.phone = value
    }

    const signUp = async () => {
        const result = await viewState.signUp(recaptchaVerifier.current)
        if (result) {
            navigation.navigate('Pin', { phone: viewState.normalizedPhone, verificationId: result })
        }
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Working visible={signingUp} />
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/images/icon.png')}
                    />
                    <Text category="s1" style={styles.title}>
                        Insira seu número de telefone abaixo.
                    </Text>
                </View>
                <Input
                    placeholder="País"
                    style={styles.input}
                    value="Brasil (+55)"
                    editable={false}
                    size="large"
                />
                <Input
                    placeholder="Número de telefone"
                    style={styles.input}
                    value={phone}
                    onChangeText={onChangePhoneNumber}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    editable={!signingUp}
                    size="large"
                />
                <View style={styles.footer}>
                    <Text category="s1" style={styles.subtitle}>
                        Você receberá um SMS com um código de verificação para confirmarmos sua
                        identidade.
                    </Text>
                    <Button
                        disabled={!validatePhoneNumber(`${countryCode}${phone}`) || signingUp}
                        onPress={signUp}
                        size="giant">
                        Confirmar
                    </Button>
                </View>
            </ScrollView>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={config.firebase}
            />
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
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        marginTop: 10,
    },
}
