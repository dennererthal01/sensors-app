import React from 'react'

import { Layout } from '@ui-kitten/components'
import { View, StatusBar } from 'react-native'

let styles

export default ({ children, ...other }) => (
    <Layout style={styles.container(StatusBar.currentHeight || 0)}>
        <View {...other}>{children}</View>
    </Layout>
)

styles = {
    container: statusBarHeight => ({
        flexGrow: 1,
        paddingTop: statusBarHeight,
    }),
}
