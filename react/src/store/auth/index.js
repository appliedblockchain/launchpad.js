import Mantle from '@appliedblockchain/mantle'
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
const LOAD_MNEMONIC_PERSIST = fullName(moduleName, 'LOAD_MNEMONIC_PERSIST')
const LOGOUT = fullName(moduleName, 'LOGOUT')
const LOGOUT_SUCCESS = fullName(moduleName, 'LOGOUT_SUCCESS')
const LOGOUT_CLEAR = fullName(moduleName, 'LOGOUT_CLEAR')

export const ACTIONS = {
  LOAD_MNEMONIC,
  LOAD_MNEMONIC_SUCCESS,
  LOAD_MNEMONIC_FAIL,
  LOAD_MNEMONIC_PERSIST,
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

export const generateMnemonicSuccess = mnemonic => ({
  type: GENERATE_MNEMONIC_SUCCESS,
  payload: mnemonic
})

export const loadMnemonic = mnemonic => ({
  type: LOAD_MNEMONIC,
  payload: mnemonic
})

export const loadMnemonicSuccess = payload => ({
  type: LOAD_MNEMONIC_SUCCESS,
  payload
})

export const loadMnemonicFail = () => ({
  type: LOAD_MNEMONIC_FAIL
})

export const loadMnemonicPersist = () => ({
  type: LOAD_MNEMONIC_PERSIST
})

export const logout = () => ({
  type: LOGOUT
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

let mantle = {}
let address = ''
let publicKey = ''
let mnemonic = localStorage.getAuth('mnemonic', true) || ''
let authenticated = false
if (mnemonic) {
  try {
    mantle = new Mantle()
    mantle.loadMnemonic(mnemonic)
    address = mantle.address
    publicKey = mantle.getPublicKey('hex0x')
    authenticated = true
  } catch (error) {
    console.log(error)
    mnemonic = ''
    address = ''
    publicKey = ''
    mantle = {}
  }
}

// Reducer
const initialState = {
  authenticated,
  mantle,
  mnemonic,
  address,
  publicKey
}
const logoutState = {
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
        mnemonic: action.payload
      }
    }
    case LOAD_MNEMONIC_SUCCESS:
      localStorage.setItem(localStorage.keys.tempMnemonic, action.payload.mnemonic)
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        mnemonic: 'temp'
      }
    case LOAD_MNEMONIC_PERSIST: {
      const mnemonic = localStorage.getItem(localStorage.keys.tempMnemonic)
      localStorage.removeItem(localStorage.keys.tempMnemonic)
      return {
        ...state,
        authenticated: true,
        mnemonic
      }
    }
    case LOAD_MNEMONIC_FAIL:
      return logoutState
    case LOGOUT_SUCCESS:
      return logoutState
    default:
      return state
  }
}
