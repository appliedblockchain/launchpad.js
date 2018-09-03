import fullName from 'utils/fullName'

const moduleName = 'auth'
// Action Names
const GENERATE_MNEMONIC = fullName(moduleName, 'GENERATE_MNEMONIC')
const GENERATE_MNEMONIC_SUCCESS = fullName(
  moduleName,
  'GENERATE_MNEMONIC_SUCCESS'
)
const GENERATE_MNEMONIC_FAIL = fullName(moduleName, 'GENERATE_MNEMONIC_FAIL')
const LOAD_MNEMONIC = fullName(moduleName, 'LOAD_MNEMONIC')
const LOAD_MNEMONIC_SUCCESS = fullName(moduleName, 'LOAD_MNEMONIC_SUCCESS')
const LOAD_MNEMONIC_FAIL = fullName(moduleName, 'LOAD_MNEMONIC_FAIL')

export const ACTIONS = {
  LOAD_MNEMONIC,
  LOAD_MNEMONIC_SUCCESS,
  LOAD_MNEMONIC_FAIL,
  GENERATE_MNEMONIC,
  GENERATE_MNEMONIC_SUCCESS,
  GENERATE_MNEMONIC_FAIL
}

// Actions
export const generateMnemonic = () => ({
  type: GENERATE_MNEMONIC
})

export const loadMnemonic = mnemonic => ({
  type: LOAD_MNEMONIC,
  payload: mnemonic
})

// Reducer
const initialState = {
  isAuthenteticated: false,
  mnemonic: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MNEMONIC_SUCCESS: {
      return {
        ...state,
        mnemonic: action.payload
      }
    }
    case LOAD_MNEMONIC_SUCCESS: {
      const { mnemonic, address, publicKey } = action.payload
      return {
        ...state,
        isAuthenteticated: true,
        mnemonic,
        address,
        publicKey
      }
    }
    case LOAD_MNEMONIC_FAIL:
      return state
    default:
      return state
  }
}
