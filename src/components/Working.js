import React from 'react'

import Overlay from 'react-native-loading-spinner-overlay'
import { Spinner } from '@ui-kitten/components'

export default (props) => <Overlay customIndicator={<Spinner />} {...props} />
