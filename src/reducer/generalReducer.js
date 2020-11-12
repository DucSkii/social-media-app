export const initialState = {
  isDrawerOpen: false,
  darkMode: false,
  pageNav: '',
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
    case 'CHANGE_NAV':
      return {
        ...state,
        pageNav: action.nav
      }
    default:
      return state
  }
}

export default generalReducer