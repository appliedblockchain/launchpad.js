import reducer, { ACTIONS, fetchUsers } from './index'

describe('reducer: store/auth', () => {
  const {
    FETCH_USERS
  } = ACTIONS

  describe('Action Creators', () => {
    describe('fetchUsers', () => {
      it('returns the correct type and payload', () => {
        const produces = { type: FETCH_USERS }
        expect(fetchUsers()).toEqual(produces)
      })
    })
  })

  describe('Reducer', () => {
    it('has a working default state', () => {
      expect(reducer('', {})).toEqual('')
      expect(reducer({ initial: true }, {})).toEqual({ initial: true })
    })
  })
})
