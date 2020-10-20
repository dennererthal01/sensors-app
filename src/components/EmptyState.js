import React from 'react'

import { View, Image } from 'react-native'
import { Text, Button } from '@ui-kitten/components'

let styles

export default function EmptyState({ image, text, action, height, style = {} }) {
    return (
        <View style={{ ...styles.container, ...style }}>
            <Image style={styles.image({ height })} source={image} />
            <Text category="s1" style={styles.text}>
                {text}
            </Text>
            {!!action && <Button onPress={action.function}>{action.label}</Button>}
        </View>
    )
}

styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: ({ height }) => ({
        height: height || 192,
        marginBottom: 15,
        resizeMode: 'contain',
    }),
    text: {
        marginBottom: 15,
        textAlign: 'center',
    },
}
