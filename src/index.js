import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { UserContextProvider } from './context/UserContext'
import { GeneralContextProvider } from './context/GeneralContext'
import userReducer, { initialUserState } from './reducer/userReducer'
import generalReducer, { initialState } from './reducer/generalReducer'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  }
})

ReactDOM.render(
  <GeneralContextProvider reducer={generalReducer} initialState={initialState}>
    <UserContextProvider reducer={userReducer} initialState={initialUserState}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </GeneralContextProvider>
  , document.getElementById('root')
)