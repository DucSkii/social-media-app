import ColourPalette from '../utils/ColourPalette'

export const initialState = {
  isDrawerOpen: false,
  darkMode: false,
  colorTheme: {
    id: 0,
    primary: {
      main: '#000000',
      dark: '#fff',
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