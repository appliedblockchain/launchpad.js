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
  users: [
    {
      name: 'Tiago Gomes',
      publicKey:
        '8a98e4a111c88e97109c5e3be6638ac9b11058def58a3d3b5e9503eee8542c34a55220aee97eaeb065d862576a9fcd9eaa1fd91582ed2380c91923bbdbf5412e'
    },
    {
      name: 'Joao Batista',
      publicKey:
        '9a98e4a111c88e97109c5e3be6638ac9b11058def58a3d3b5e9503eee8542c34a55220aee97eaeb065d862576a9fcd9eaa1fd91582ed2380c91923bbdbf5412e'
    }
  ]
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
