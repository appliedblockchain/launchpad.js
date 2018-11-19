import { createTransform } from 'redux-persist'
import { NOT_AUTHENTICATED_ROUTES } from 'constants.js'

export default createTransform(
  (inboundState, key) => {
    const path = window.location.pathname
    if (key === 'mnemonic' && NOT_AUTHENTICATED_ROUTES.includes(path)) {
      return ''
    }
    return inboundState
  },
  outboundState => outboundState
)
