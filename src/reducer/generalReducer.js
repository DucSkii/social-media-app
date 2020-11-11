export const initialState = {
  isDrawerOpen: false,
}

const generalReducer = (state, action) => {
  switch (action.type) {
    case 'DRAWER_TOGGLE':
      return {
        isDrawerOpen: action.open
      }
    default:
      return state
  }
}

export default generalReducer