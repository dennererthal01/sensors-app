import { createBottomTabNavigator } from 'react-navigation-tabs'

import OverviewNavigator from './Navigators/OverviewNavigator'
import SettingsNavigator from './Navigators/SettingsNavigator'

import BottomBar from './BottomBar'

const appNavigation = createBottomTabNavigator({
    OverviewNavigator,
    SettingsNavigator
}, {
    tabBarComponent: BottomBar,
})

export default appNavigation
