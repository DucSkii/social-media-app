export const initialUserState = {
  user: null,
  userDisplayName: '',
  userId: '',
  userImage: '',
  userBanner: '',
  selectBanner: '',
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
    case 'SET_BANNER':
      return {
        ...state,
        userBanner: action.banner,
      }
    case 'SELECT_BANNER':
      return {
        ...state,
        selectBanner: action.banner,
      }
    default:
      return state
  }
}

export default userReducer