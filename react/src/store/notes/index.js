import _uniqBy from 'lodash/uniqBy'
import fullName from 'utils/fullName'
const moduleName = 'notes'

// Action Names
const ADD_NOTE = fullName(moduleName, 'ADD_NOTE')
const ADD_NOTE_SUCCESS = fullName(moduleName, 'ADD_NOTE_SUCCESS')
const ADD_NOTE_FAIL = fullName(moduleName, 'ADD_NOTE_FAIL')
const DECRYPT_NOTE = fullName(moduleName, 'DECRYPT_NOTE')
const DECRYPT_NOTE_SUCCESS = fullName(moduleName, 'DECRYPT_NOTE_SUCCESS')
const DECRYPT_NOTE_FAIL = fullName(moduleName, 'DECRYPT_NOTE_FAIL')

const FETCH_NOTES = fullName(moduleName, 'FETCH_NOTES')
const FETCH_NOTES_SUCCESS = fullName(moduleName, 'FETCH_NOTES_SUCCESS')
const FETCH_NOTES_FAIL = fullName(moduleName, 'FETCH_NOTES_FAIL')

const SEARCH_NOTES = fullName(moduleName, 'SEARCH_NOTES')
const SEARCH_NOTES_SUCCESS = fullName(moduleName, 'SEARCH_NOTES_SUCCESS')
const SEARCH_NOTES_FAIL = fullName(moduleName, 'SEARCH_NOTES_FAIL')

const SET_QUERY = fullName(moduleName, 'SET_QUERY')

export const ACTIONS = {
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  DECRYPT_NOTE,
  DECRYPT_NOTE_SUCCESS,
  DECRYPT_NOTE_FAIL,
  FETCH_NOTES,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAIL,
  SEARCH_NOTES,
  SEARCH_NOTES_SUCCESS,
  SEARCH_NOTES_FAIL,
  SET_QUERY
}

// Actions
export const addNote = (tag, text, publicKeys) => ({
  type: ADD_NOTE,
  payload: {
    tag,
    text,
    publicKeys
  }
})

export const addNoteSuccess = payload => ({
  type: ADD_NOTE_SUCCESS,
  payload
})

export const addNoteFail = payload => ({
  type: ADD_NOTE_FAIL,
  payload
})

export const decryptNote = mnemonic => ({
  type: DECRYPT_NOTE,
  payload: mnemonic
})

// Actions
export const fetchNotes = () => ({
  type: FETCH_NOTES
})

export const fetchNotesSuccess = notes => ({
  type: FETCH_NOTES_SUCCESS,
  payload: notes
})

export const searchNotes = payload => ({
  type: SEARCH_NOTES,
  payload
})

export const searchNotesSuccess = payload => ({
  type: SEARCH_NOTES_SUCCESS,
  payload
})

export const searchNotesFailure = () => ({
  type: SEARCH_NOTES_FAIL
})

export const setQuery = query => ({
  type: SET_QUERY,
  payload: query
})

const initialState = {
  notes: [],
  offset: 0,
  query: '',
  previousQuery: '',
  contract: { loaded: false }
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload
      }
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [ action.payload.note, ...state.notes ],
        contract: action.payload.contract,
        query: ''
      }
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case SEARCH_NOTES_FAIL:
      return {
        ...initialState,
        notes: state.notes
      }
    case SEARCH_NOTES_SUCCESS: {
      const notes = state.previousQuery === action.payload.previousQuery ? state.notes : []
      return {
        ...action.payload,
        query: state.query,
        contract: state.contract,
        notes: _uniqBy([ ...notes, ...action.payload.notes ], note => `${note.author}${note.encryptedText}`)
      }
    }
    default:
      return state
  }
}
