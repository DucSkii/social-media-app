import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Drawer from '@material-ui/core/Drawer'
import DrawerBar from './components/Drawer'
import { useGeneralValue } from './context/GeneralContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.scss'

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

const App = () => {

  const [{ isDrawerOpen }, dispatch] = useGeneralValue()

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <ScrollToTop />
          <Drawer
            open={isDrawerOpen}
            anchor='right'
            onClose={() => dispatch({ type: 'DRAWER_TOGGLE', open: false })}
          >
            <DrawerBar />
          </Drawer>
          <header>
            <Header />
          </header>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
