import reducer, { ACTIONS, generateMnemonic, loadMnemonic } from './index'

describe('reducer: store/auth', () => {
  const {
    GENERATE_MNEMONIC, LOAD_MNEMONIC
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
  })

  // describe('Reducer', () => {
  //   it('has a working default state', () => {
  //     expect(reducer('', {})).toEqual('')
  //     expect(reducer({ initial: true }, {})).toEqual({ initial: true })
  //   })

  //   describe('REGISTER_SUCCESS', () => {
  //     it('returns the auth object', () => {
  //       expect(
  //         reducer(
  //           {},
  //           { type: REGISTER_SUCCESS, payload: { mnemonic: 'mnemonic' } }
  //         )
  //       ).toEqual({
  //         mnemonic: 'mnemonic',
  //         requestPassword: false,
  //         derivationError: false
  //       })
  //     })
  //   })
  // })
})
