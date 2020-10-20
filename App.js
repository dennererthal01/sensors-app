import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { AppearanceProvider } from 'react-native-appearance'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { mapping, dark, light } from '@eva-design/eva'

import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import appTheme from './custom-theme.json'

import AppState from './src/AppState'

import AppNavigator from './src/navigation/AppNavigator'

import getVariable from './src/utils/theme/getVariable'
import catchError from './src/utils/error/catch'

dayjs.extend(relativeTime)

const darkTheme = { ...dark, ...appTheme }
const lightTheme = { ...light, ...appTheme }

let styles

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            // eslint-disable-next-line global-require
            require('./assets/images/icon.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
        }),
    ])
}

function handleLoadingError(error) {
    catchError(error)
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true)
}

export default observer(({ skipLoadingScreen }) => {
    const appState = useContext(AppState)

    const [isLoadingComplete, setLoadingComplete] = useState(false)

    useEffect(() => {
        appState.init()
    }, [appState])

    if ((!isLoadingComplete || appState.loading) && !skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        )
    }

    const Navigator = AppNavigator(appState)

    const theme = appState.theme !== 'dark' ? lightTheme : darkTheme

    return (
        <AppearanceProvider>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={theme}>
                <SafeAreaView
                    style={styles.container(getVariable(theme, 'background-basic-color-1'))}>
                    {Platform.OS === 'ios' && (
                        <StatusBar
                            barStyle={appState.theme === 'light' ? 'dark-content' : 'light-content'}
                        />
                    )}
                    <Navigator enableURLHandling={false} />
                </SafeAreaView>
            </ApplicationProvider>
        </AppearanceProvider>
    )
})

styles = StyleSheet.create({
    container: (backgroundColor) => ({
        flex: 1,
        backgroundColor,
    }),
})
