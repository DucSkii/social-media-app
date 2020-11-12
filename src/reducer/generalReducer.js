export const initialState = {
  isDrawerOpen: false,
  darkMode: false,
}

const generalReducer = (state, action) => {
  switch (action.type) {
    case 'DRAWER_TOGGLE':
      return {
        ...state,
        isDrawerOpen: action.open,
        darkMode: action.mode,
      }
    case 'DARKMODE_TOGGLE':
      return {
        ...state,
        darkMode: action.mode,
      }
    default:
      return state
  }
}

export default generalReducer