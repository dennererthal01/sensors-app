import { createBottomTabNavigator } from 'react-navigation-tabs'

import OverviewNavigator from './Navigators/OverviewNavigator'

import BottomBar from './BottomBar'

const appNavigation = createBottomTabNavigator({
    OverviewNavigator,
}, {
    tabBarComponent: BottomBar,
})

export default appNavigation
