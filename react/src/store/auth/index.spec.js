import reducer, { ACTIONS, generateMnemonic, loadMnemonic, logout } from './index'

describe('reducer: store/auth', () => {
  const {
    GENERATE_MNEMONIC, LOAD_MNEMONIC, LOGOUT,
    GENERATE_MNEMONIC_SUCCESS, LOAD_MNEMONIC_SUCCESS
  } = ACTIONS

  describe('Action Creators', () => {
    describe('generateMnemonic', () => {
      it('returns the correct type', () => {
        const produces = { type: GENERATE_MNEMONIC }
        expect(generateMnemonic()).toEqual(produces)
      })
    })

    describe('loadMnemonic', () => {
      it('returns the correct type and payload', () => {
        const given = 'mnemonic'
        const produces = { type: LOAD_MNEMONIC, payload: given }
        expect(loadMnemonic(given)).toEqual(produces)
      })
    })

    describe('logout', () => {
      it('returns the correct type', () => {
        const produces = { type: LOGOUT }
        expect(logout()).toEqual(produces)
      })
    })
  })

  describe('Reducer', () => {
    it('has a working default state', () => {
      expect(reducer('', {})).toEqual('')
      expect(reducer({ initial: true }, {})).toEqual({ initial: true })
    })

    describe('GENERATE_MNEMONIC_SUCCESS', () => {
      it('sets the mnemonic', () => {
        const previousState = { previous: true }
        const payload = 'mnemonic'
        const action = { type: GENERATE_MNEMONIC_SUCCESS, payload }
        const produces = { ...previousState, mnemonic: payload }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })

    describe('LOAD_MNEMONIC_SUCCESS', () => {
      it('sets the mantle object and temporary mnemonic', () => {
        const previousState = { authenticated: false, mantle: {}, mnemonic: 'mnemonic' }
        const payload = { mnemonic: 'mnemonic', mantle: { isBuilt: true } }
        const action = { type: LOAD_MNEMONIC_SUCCESS, payload }
        const produces = { ...previousState, authenticated: true, mnemonic: 'temp', mantle: { isBuilt: true } }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })
  })
})
