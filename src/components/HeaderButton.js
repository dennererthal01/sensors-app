import React from 'react'

import { TouchableOpacity } from 'react-native'
import { Text } from '@ui-kitten/components'

export default function HeaderButton({
    disabled, children, onPress, ...other
}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} {...other}>
            <Text
                status={disabled ? undefined : 'primary'}
                appearance={disabled ? 'hint' : 'default'}
            >
                {children}
            </Text>
        </TouchableOpacity>
    )
}
