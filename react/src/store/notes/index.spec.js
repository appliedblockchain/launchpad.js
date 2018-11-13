import reducer, { ACTIONS, fetchNotes, searchNotes, addNote } from './index'

describe('reducer: store/notes', () => {
  const {
    FETCH_NOTES, SEARCH_NOTES, ADD_NOTE,
    FETCH_NOTES_SUCCESS, ADD_NOTE_SUCCESS,
    SET_QUERY, SEARCH_NOTES_SUCCESS
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

    describe('SET_QUERY', () => {
      it('sets the query to the expected value', () => {
        const previousState = { query: 'query' }
        const payload = 'different'
        const action = { type: SET_QUERY, payload }
        const produces = { query: payload }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })

    describe('SEARCH_NOTES_SUCCESS', () => {
      it('appens unique values to the notes when searching for the same thing', () => {
        const previousState = {
          previousQuery: 'query',
          query: 'query',
          contract: {},
          notes: [ { author: '1', encryptedText: '1' }, { author: '2', encryptedText: '2' } ]
        }
        const payload = {
          previousQuery: 'query',
          notes: [ { author: '2', encryptedText: '2' }, { author: '3', encryptedText: '3' } ]
        }
        const action = { type: SEARCH_NOTES_SUCCESS, payload }
        const produces = {
          ...previousState,
          notes: [ { author: '1', encryptedText: '1' }, { author: '2', encryptedText: '2' }, { author: '3', encryptedText: '3' } ]
        }
        expect(reducer(previousState, action)).toEqual(produces)
      })

      it('sets only new values to the notes when searching for a different thing', () => {
        const previousState = {
          previousQuery: 'previousQuery',
          query: 'query',
          contract: {},
          notes: [ { author: '1', encryptedText: '1' }, { author: '2', encryptedText: '2' } ]
        }
        const payload = {
          previousQuery: 'newQuery',
          notes: [ { author: '3', encryptedText: '3' }, { author: '4', encryptedText: '4' } ]
        }
        const action = { type: SEARCH_NOTES_SUCCESS, payload }
        const produces = {
          ...previousState,
          previousQuery: payload.previousQuery,
          notes: [ { author: '3', encryptedText: '3' }, { author: '4', encryptedText: '4' } ]
        }
        expect(reducer(previousState, action)).toEqual(produces)
      })
    })
  })
})
