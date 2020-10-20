import React, { useRef } from 'react'

import { TouchableWithoutFeedback, View } from 'react-native'
import { Input } from '@ui-kitten/components'

let styles

export default ({ style = {}, ...props }) => {
    const inputRef = useRef()

    const onPressTouchable = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPressTouchable}>
            <View style={styles.view}>
                <Input style={{ ...styles.input, ...style }} ref={inputRef} {...props} />
            </View>
        </TouchableWithoutFeedback>
    )
}

styles = {
    view: {
        width: '100%',
    },
    input: {
        flexGrow: 1,
    },
}
