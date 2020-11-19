import React from 'react'
import { observer } from 'mobx-react-lite'

import { Tab, TabBar } from '@ui-kitten/components'

let styles

export default observer(({ selectedTab, setSelectedTab }) => {
    return (
        <TabBar
            style={styles.tabs}
            selectedIndex={selectedTab}
            onSelect={setSelectedTab}
        >
            <Tab title='Tempo real'/>
            <Tab title='Consulta'/>
        </TabBar>
    )
})

styles = {
    tabs: {
        marginTop: 10,
    }
}