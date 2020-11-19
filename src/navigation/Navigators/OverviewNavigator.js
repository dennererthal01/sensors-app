import { createStackNavigator } from 'react-navigation-stack'
import { getActiveChildNavigationOptions } from 'react-navigation'

import OverviewDashboardScreen from '../../screens/Overview/Dashboard'
import ChooseActiveDeviceScreen from '../../modules/ChooseActiveDevice'

const ChooseActiveDeviceStack = createStackNavigator(
    {
        ChooseActiveDevice: ChooseActiveDeviceScreen,
    }, 
    {
        initialRouteName: 'ChooseActiveDevice',
        headerMode: 'none'
    }
)

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
        ChooseActiveDevice: ChooseActiveDeviceStack,
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
