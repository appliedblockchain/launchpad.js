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
export const ACTIONS = {
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  DECRYPT_NOTE,
  DECRYPT_NOTE_SUCCESS,
  DECRYPT_NOTE_FAIL,
  FETCH_NOTES,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAIL
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

export const decryptNote = mnemonic => ({
  type: DECRYPT_NOTE,
  payload: mnemonic
})

// Actions
export const fetchNotes = () => ({
  type: FETCH_NOTES
})

// Reducer
const initialState = {
  notes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [ action.payload, ...state.notes ]
      }
    case DECRYPT_NOTE_SUCCESS:
      return {
        ...state
      }

    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload
      }
    default:
      return state
  }
}
