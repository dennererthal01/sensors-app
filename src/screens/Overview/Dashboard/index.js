/* eslint-disable global-require */
import React from 'react'
import { observer } from 'mobx-react-lite'

import { View, ScrollView, Dimensions } from 'react-native'
import { Text } from '@ui-kitten/components'

import {
    LineChart,
    PieChart,
  } from 'react-native-chart-kit'

import Container from '../../../components/Container'

let styles

export default observer(({ navigation }) => {

    const pieData = [
        { name: 'Ativos', value: 10, color: 'green', legendFontColor: 'black', legendFontSize: 15 },
        { name: 'Inativos', value: 2, color: 'red', legendFontColor: 'black', legendFontSize: 15 },
    ]

    const sampleData = {
        labels: ['01/10/2020', '02/10/2020', '03/10/2020'],
        datasets: [{
            data: [30, 28, 27]
        }]
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text category='h6'>Temperatura (°)</Text>
                <LineChart
                    data={sampleData}
                    width={Dimensions.get('window').width}
                    height={200}
                    bezier
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(3, 69, 252, ${opacity})`,
                        decimalPlaces: 0
                    }}
                    style={{
                        marginVertical: 8,
                        marginHorizontal: -32,
                    }}
                    />
                <Text style={{ marginTop: 50 }} category='h6'>Dispositivos</Text>
                <PieChart
                    data={pieData}
                    width={Dimensions.get('window').width}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(3, 69, 252, ${opacity})`,
                        decimalPlaces: 0
                    }}
                    style={{
                        marginVertical: 8,
                        marginHorizontal: -10,
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                />
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
        marginTop: 30,
        flexGrow: 1,
        justifyContent: 'flex-start',
    }
}
