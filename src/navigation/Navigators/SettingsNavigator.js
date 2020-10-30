import { createStackNavigator } from 'react-navigation-stack'
import { getActiveChildNavigationOptions } from 'react-navigation'

import SettingsHomeScreen from '../../screens/Settings/Home'
import SettingsDevicesScreen from '../../screens/Settings/Devices'
import CreateDeviceScreen from '../../modules/CreateDevice'

const CreateDeviceScreenStack = createStackNavigator(
    {
        CreateDevice: CreateDeviceScreen,
    }, 
    {
        initialRouteName: 'CreateDevice',
        headerMode: 'none'
    }
)

const SettingsScreenStack = createStackNavigator(
    {
        Settings: SettingsHomeScreen,
        Devices: SettingsDevicesScreen
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
