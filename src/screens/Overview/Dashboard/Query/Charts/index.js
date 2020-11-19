import React from 'react'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'

import { View, Dimensions } from 'react-native'
import { Text } from '@ui-kitten/components'
import { BarChart, YAxis, XAxis } from 'react-native-svg-charts'

const generateData = (measures, config) => ({
    labels: measures.map(measure => dayjs(measure.date).format('HH:mm')),
    data: measures.map(measure => config.parse(measure.value))
})

export default observer(({ viewState }) => {
    const { measures: allMeasures, sensorConfig, appState } = viewState

    const { sensors } = appState

    const axesSvg = { fontSize: 10, fill: '#fff' };
    const verticalContentInset = { top: 10, bottom: 10 }

    return (
        <View>
            {Object.keys(allMeasures).map(key => {
                if (key === 'Gabinete') {
                    return null
                }
                const config = sensorConfig[key]
                const data = generateData(allMeasures[key], config)
                const sensor = sensors.find(sensor => allMeasures[key][0].sensor === sensor.id)
                return (
                    <View style={{
                            height: 250,
                            marginBottom: 20,
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            paddingTop: 40,
                            width: Dimensions.get('window').width - 40,
                            backgroundColor: config.value,
                            borderRadius: 10,
                            position: 'relative'
                        }}>
                        <Text style={{ fontSize: 14, color: '#fff', position: 'absolute', left: 10, top: 10, fontWeight: 'bold' }}>{`${sensor.name} (${sensor.unit})`}</Text>
                        <YAxis
                            data={data.data}
                            style={{ marginBottom: 30 }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                            formatLabel={(value) => `${value}${sensor.unit}`}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <BarChart
                                style={{ flex: 1, width: Dimensions.get('window').width - 90 }}
                                data={data.data}
                                contentInset={verticalContentInset}
                                svg={{ fill: '#fff' }}
                            />
                            <XAxis
                                style={{ marginHorizontal: -10, height: 30, width: Dimensions.get('window').width - 80 }}
                                data={data.labels}
                                formatLabel={(value) => data.labels[value]}
                                contentInset={{ left: 10, right: 25 }}
                                svg={{
                                    fill: '#fff',
                                    fontSize: 10,
                                    rotation: 30,
                                    originY: 30,
                                    y: 5,
                                }}
                            />
                        </View>
                    </View>
                )
            })}
        </View>
    )
})
