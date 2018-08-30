import fullName from 'utils/fullName'

// Action Names
const GENERATE_MNEMONIC = fullName('auth', 'GENERATE_MNEMONIC')
const GENERATE_MNEMONIC_SUCCESS = fullName('auth', 'GENERATE_MNEMONIC_SUCCESS')
const GENERATE_MNEMONIC_FAIL = fullName('auth', 'GENERATE_MNEMONIC_FAIL')

export const ACTIONS = {
  GENERATE_MNEMONIC,
  GENERATE_MNEMONIC_SUCCESS,
  GENERATE_MNEMONIC_FAIL
}

// Actions
export const generateMnemonic = () => ({
  type: GENERATE_MNEMONIC
})

export const generateMnemonicSuccess = mnemonic => ({
  type: GENERATE_MNEMONIC_SUCCESS,
  payload: mnemonic
})

// Reducer
const initialState = {
  mnemonic: '',
  mnemonicError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MNEMONIC_SUCCESS:
      return {
        ...state,
        mnemonic: action.payload
      }
    default:
      return state
  }
}
