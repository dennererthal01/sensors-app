import { createStackNavigator } from 'react-navigation-stack'

import Phone from '../screens/Auth/Phone'
import Pin from '../screens/Auth/Pin'

export default createStackNavigator(
    {
        Phone,
        Pin,
    },
    {
        initialRouteName: 'Phone',
        headerMode: 'none',
    },
)
