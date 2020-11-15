export const initialUserState = {
  userExists: null,
  userDisplayName: '',
  userId: '',
}


const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_UID':
      return {
        ...state,
        userId: action.id,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        userExists: action.user,
      }
    case 'UPDATE_DISPLAYNAME':
      return {
        ...state,
        userDisplayName: action.name,
      }
    default:
      return state
  }
}

export default userReducer