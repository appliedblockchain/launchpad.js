import fullName from 'utils/fullName'
const moduleName = 'users'
// Action Names
const FETCH_USERS = fullName(moduleName, 'FETCH_USERS')
const FETCH_USERS_SUCCESS = fullName(moduleName, 'FETCH_USERS_SUCCESS')
const FETCH_USERS_FAIL = fullName(moduleName, 'FETCH_USERS_FAIL')

export const ACTIONS = {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL
}

// Actions
export const fetchUsers = () => ({
  type: FETCH_USERS
})

// Reducer
const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        notes: [ action.payload, ...state.notes ]
      }
    default:
      return state
  }
}
