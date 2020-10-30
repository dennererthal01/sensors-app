import { createStackNavigator } from 'react-navigation-stack'
import { getActiveChildNavigationOptions } from 'react-navigation'

import OverviewDashboardScreen from '../../screens/Overview/Dashboard'

const OverviewScreenStack = createStackNavigator(
    {
        Overview: OverviewDashboardScreen,
    },
    {
        initialRouteName: 'Overview',
        headerMode: 'none',
    }
)

const OverviewStack = createStackNavigator(
    {
        Overview: OverviewScreenStack,
    },
    {
        initialRouteName: 'Overview',
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: ({ navigation, screenProps }) => ({
            ...getActiveChildNavigationOptions(navigation, screenProps),
        }),
    }
)

export default OverviewStack
