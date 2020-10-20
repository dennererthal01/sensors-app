import { createStackNavigator } from 'react-navigation-stack'

import Name from '../screens/Onboarding/Name'

export default createStackNavigator(
    {
        Name,
    },
    {
        initialRouteName: 'Name',
        headerMode: 'none',
    }
)
