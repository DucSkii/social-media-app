import ColourPalette from '../utils/ColourPalette'

export const initialState = {
  isDrawerOpen: false,
  darkMode: false,
  pageNav: '',
  colorTheme: {
    id: 1,
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
    },
  }
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
    case 'SELECT_THEME':
      return {
        ...state,
        colorTheme: ColourPalette[action.id],
      }
    default:
      return state
  }
}

export default generalReducer