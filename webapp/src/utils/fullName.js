import { APP_PREFIX } from 'constants.js'

const fullName = (state, action) => `${APP_PREFIX}/${state}/${action}`

export default fullName
