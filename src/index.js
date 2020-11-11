import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { UserContextProvider } from './context/UserContext'
import userReducer, { initialUserState } from './reducer/userReducer'

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
  <React.StrictMode>
    <UserContextProvider reducer={userReducer} initialState={initialUserState}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)