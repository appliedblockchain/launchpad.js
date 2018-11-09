import fullName from 'utils/fullName'
import localStorage from 'utils/localStorage'

const moduleName = 'auth'
// Action Names
const GENERATE_MNEMONIC = fullName(moduleName, 'GENERATE_MNEMONIC')
const GENERATE_MNEMONIC_SUCCESS = fullName(moduleName, 'GENERATE_MNEMONIC_SUCCESS')
const GENERATE_MNEMONIC_FAIL = fullName(moduleName, 'GENERATE_MNEMONIC_FAIL')
const LOAD_MNEMONIC = fullName(moduleName, 'LOAD_MNEMONIC')
const LOAD_MNEMONIC_SUCCESS = fullName(moduleName, 'LOAD_MNEMONIC_SUCCESS')
const LOAD_MNEMONIC_FAIL = fullName(moduleName, 'LOAD_MNEMONIC_FAIL')
const LOGOUT = fullName(moduleName, 'LOGOUT')
const LOGOUT_SUCCESS = fullName(moduleName, 'LOGOUT_SUCCESS')
const LOGOUT_CLEAR = fullName(moduleName, 'LOGOUT_CLEAR')

export const ACTIONS = {
  LOAD_MNEMONIC,
  LOAD_MNEMONIC_SUCCESS,
  LOAD_MNEMONIC_FAIL,
  GENERATE_MNEMONIC,
  GENERATE_MNEMONIC_SUCCESS,
  GENERATE_MNEMONIC_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_CLEAR
}

// Actions
export const generateMnemonic = () => ({
  type: GENERATE_MNEMONIC
})

export const loadMnemonic = mnemonic => ({
  type: LOAD_MNEMONIC,
  payload: mnemonic
})

export const logout = () => ({
  type: LOGOUT
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const logoutClear = () => ({
  type: LOGOUT_CLEAR
})

// Reducer
const initialState = {
  authenticated: false,
  mantle: {},
  mnemonic: '',
  address: '',
  publicKey: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MNEMONIC_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        mantle: action.payload.mantle,
        mnemonic: action.payload.mnemonic
      }
    }
    case LOAD_MNEMONIC_SUCCESS:
      return {
        ...action.payload,
        authenticated: true
      }
    case LOAD_MNEMONIC_FAIL:
      return initialState
    case LOGOUT_SUCCESS:
      return initialState
    case LOGOUT_CLEAR:
      localStorage.clearAuth()
      return initialState
    default:
      return state
  }
}
