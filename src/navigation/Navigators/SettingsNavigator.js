import { createStackNavigator } from 'react-navigation-stack'
import { getActiveChildNavigationOptions } from 'react-navigation'

import SettingsHomeScreen from '../../screens/Settings/Home'
import SettingsDevicesScreen from '../../screens/Settings/Devices'
import SettingsAlertsScreen from '../../screens/Settings/Alerts'
import CreateDeviceScreen from '../../modules/CreateDevice'
import CreateAlertScreen from '../../modules/CreateAlert'

const CreateDeviceScreenStack = createStackNavigator(
    {
        CreateDevice: CreateDeviceScreen,
    }, 
    {
        initialRouteName: 'CreateDevice',
        headerMode: 'none'
    }
)

const CreateAlertScreenStack = createStackNavigator(
    {
        CreateAlert: CreateAlertScreen,
    }, 
    {
        initialRouteName: 'CreateAlert',
        headerMode: 'none'
    }
)

const SettingsScreenStack = createStackNavigator(
    {
        Settings: SettingsHomeScreen,
        Devices: SettingsDevicesScreen,
        Alerts: SettingsAlertsScreen
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'none',
    }
)

const OverviewStack = createStackNavigator(
    {
        Settings: SettingsScreenStack,
        CreateDevice: CreateDeviceScreenStack,
        CreateAlert: CreateAlertScreenStack,
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: ({ navigation, screenProps }) => ({
            ...getActiveChildNavigationOptions(navigation, screenProps),
        }),
    }
)

export default OverviewStack
