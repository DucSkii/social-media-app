export const initialUserState = {
  user: null,
  userDisplayName: '',
  userId: '',
  userImage: '',
}


const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        userDisplayName: action.payload.displayName,
        userId: action.payload.uid,
        userImage: action.payload.image,
      }
    case 'SET_DISPLAYNAME':
      return {
        ...state,
        userDisplayName: action.name,
      }
    case 'SET_IMAGE':
      return {
        ...state,
        userImage: action.image,
      }
    default:
      return state
  }
}

export default userReducer