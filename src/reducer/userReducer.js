export const initialUserState = {
  userExists: null,
  userDisplayName: '',
}


const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        userExists: action.user
      }
    case 'UPDATE_DISPLAYNAME':
      return {
        ...state,
        userDisplayName: action.name
      }
    default:
      return state
  }
}

export default userReducer