import reducer, { ACTIONS, fetchNotes, searchNotes, addNote } from './index'

describe('reducer: store/notes', () => {
  const {
    FETCH_NOTES, SEARCH_NOTES, ADD_NOTE,
    FETCH_NOTES_SUCCESS, ADD_NOTE_SUCCESS
  } = ACTIONS

  describe('Action Creators', () => {
    describe('fetchNotes', () => {
      it('returns the correct type and payload', () => {
        const produces = { type: FETCH_NOTES }
        expect(fetchNotes()).toEqual(produces)
      })
    })

    describe('searchNotes', () => {
      it('returns the correct type and payload when called without an offset', () => {
        const given = { query: 'query' }
        const produces = { type: SEARCH_NOTES, payload: { query: given.query, offset: undefined } }
        expect(searchNotes(given)).toEqual(produces)
      })

      it('returns the correct type and payload when called with an offset', () => {
        const given = { query: 'query', offset: 10 }
        const produces = { type: SEARCH_NOTES, payload: { query: given.query, offset: given.offset } }
        expect(searchNotes(given)).toEqual(produces)
      })
    })

    describe('addNote', () => {
      it('returns the correct type and payload', () => {
        // The arguments of addNote are: tag, text, uniquePublicKeys
        const given = [ 'tag', 'text', [ 1, 2, 3 ] ]
        const expectedPayload = { tag: given[0], text: given[1], publicKeys: given[2] }
        const produces = { type: ADD_NOTE, payload: expectedPayload }
        expect(addNote(...given)).toEqual(produces)
      })
    })
  })

  describe('Reducer', () => {
    it('has a working default state', () => {
      expect(reducer('', {})).toEqual('')
      expect(reducer({ initial: true }, {})).toEqual({ initial: true })
    })

    describe('FETCH_NOTES_SUCCESS', () => {
      it('returns the existing state, but with different notes', () => {
        const previousState = { previous: true }
        const payload = [ 1, 2, 3 ]
        const action = { type: FETCH_NOTES_SUCCESS, payload }
        const produces = { ...previousState, notes: payload }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })

    describe('ADD_NOTE_SUCCESS', () => {
      it('adds the new note, the contract and resets the query', () => {
        const previousState = { previous: true, query: 'query', notes: [ 1 ] }
        const payload = { note: 2, contract: true }
        const action = { type: ADD_NOTE_SUCCESS, payload }
        const produces = { ...previousState, notes: [ 2, 1 ], contract: true, query: '' }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })
  })
})
