import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)