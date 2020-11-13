import React, { useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Drawer from '@material-ui/core/Drawer'
import DrawerBar from './components/Drawer'
import { useGeneralValue } from './context/GeneralContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import { Paper, makeStyles } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.scss'


const App = () => {

  const [{ isDrawerOpen, darkMode, colorTheme, pageNav }, dispatch] = useGeneralValue()

  const useStyles = makeStyles({
    paperBackground: {
      backgroundColor: darkMode ? '#666' : '#fafafa',
    },
  })

  const classes = useStyles()

  useEffect(() => {
    dispatch({ type: 'CHANGE_NAV', nav: localStorage.getItem('pageNav') })
    if (localStorage.getItem('colourId') !== '') {
      dispatch({ type: 'SELECT_THEME', id: localStorage.getItem('colourId') })
    } else {
      dispatch({ type: 'SELECT_THEME', id: colorTheme.id })
    }
  }, [])

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: colorTheme.primary.main,
        dark: colorTheme.primary.dark,
      },
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

  useEffect(() => {
    const darkModeBool = localStorage.getItem('darkMode')
    if (darkModeBool === 'true') {
      dispatch({ type: 'DARKMODE_TOGGLE', mode: true })
    } else {
      dispatch({ type: 'DARKMODE_TOGGLE', mode: false })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pageNav', pageNav)
  }, [pageNav])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paperBackground}>
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
