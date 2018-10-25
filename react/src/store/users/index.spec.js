import reducer, { ACTIONS, register } from './index'

describe('reducer: store/auth', () => {
  const { REGISTER, REGISTER_SUCCESS } = ACTIONS

  describe('Action Creators', () => {
    describe('register', () => {
      it('returns the correct type and payload', () => {
        expect(register({ expected: true })).toEqual({
          type: REGISTER,
          payload: { expected: true }
        })
      })
    })
  })

  describe('Reducer', () => {
    it('has a working default state', () => {
      expect(reducer('', {})).toEqual('')
      expect(reducer({ initial: true }, {})).toEqual({ initial: true })
    })

    describe('REGISTER_SUCCESS', () => {
      it('returns the auth object', () => {
        expect(
          reducer(
            {},
            { type: REGISTER_SUCCESS, payload: { mnemonic: 'mnemonic' } }
          )
        ).toEqual({
          mnemonic: 'mnemonic',
          requestPassword: false,
          derivationError: false
        })
      })
    })
  })
})
