import { Alert } from 'react-native'

import Errors from './errors'

export default function (error, message) {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
        console.error(error)
    } else {
        // log somewhere
    }
    if (message) {
        Alert.alert(Errors.title, Errors[message], [
            {
                text: 'Fechar',
            },
        ])
    }
}
