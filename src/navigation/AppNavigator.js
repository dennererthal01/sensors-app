import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import ApplicationNavigation from './ApplicationNavigation'
import AuthenticationNavigation from './AuthenticationNavigation'
import OnboardingNavigation from './OnboardingNavigation'

let AppContainer = null

export default (appState) => {
    if (!AppContainer) {
        let initialRouteName = 'Authentication'

        const { currentUser } = appState

        if (currentUser.id) {
            if (currentUser.onboarded) {
                initialRouteName = 'Application'
            } else {
                initialRouteName = 'Onboarding'
            }
        }

        AppContainer = createAppContainer(
            createSwitchNavigator({
                Application: ApplicationNavigation,
                Authentication: AuthenticationNavigation,
                Onboarding: OnboardingNavigation,
            },
            { initialRouteName }),
        )
    }

    return AppContainer
}
