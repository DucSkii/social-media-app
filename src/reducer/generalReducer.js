import ColourPalette from '../utils/ColourPalette'

export const initialState = {
  isDrawerOpen: false,
  darkMode: (localStorage.getItem('darkMode') === 'true') ? true : false,
  colorTheme: ColourPalette[Number(localStorage.getItem('colourTheme'))],
  dbTheme: {
    dbDarkMode: (localStorage.getItem('darkMode') === 'true') ? true : false,
    dbColourTheme: Number(localStorage.getItem('colourTheme')),
  },
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
    case 'SET_THEME':
      return {
        ...state,
        dbTheme: {
          dbDarkMode: action.themePayload.darkMode,
          dbColourTheme: action.themePayload.colourTheme,
        }
      }
    default:
      return state
  }
}

export default generalReducer