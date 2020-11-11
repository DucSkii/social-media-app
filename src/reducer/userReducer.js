export const initialUserState = {
  userExists: null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        userExists: action.user
      }
    default:
      return state
  }
}

export default userReducer