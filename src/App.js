import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Drawer from '@material-ui/core/Drawer'
import DrawerBar from './components/Drawer'
import { useGeneralValue } from './context/GeneralContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import { Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.scss'


const App = () => {

  const [{ isDrawerOpen, darkMode }, dispatch] = useGeneralValue()

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
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

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div className='App'>
          <Router>
            <ScrollToTop />
            <ThemeProvider theme={theme}>
              <Drawer
                open={isDrawerOpen}
                anchor='right'
                onClose={() => dispatch({ type: 'DRAWER_TOGGLE', open: false, mode: darkMode })}
              >
                <DrawerBar />
              </Drawer>
            </ThemeProvider>
            <header>
              <Header />
            </header>
            <Switch>
              <Route path='/settings' component={Settings} />
              <Route path='/profile' component={Profile} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App;
