import React from 'react'
import { observer } from 'mobx-react-lite'

import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'

export default observer(({ navigation }) => {
    const navigate = index => {
        // navigation.navigate()
    }

    return (
        <BottomNavigation
            selectedIndex={navigation.state.index}
            onSelect={navigate}>
            <BottomNavigationTab title='Dashboard'/>
            <BottomNavigationTab title='Configurações'/>
        </BottomNavigation>
    )
})
