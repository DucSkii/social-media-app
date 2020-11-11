import React from 'react'
import Header from './components/Header'
import HomePage from './components/Pages/HomePage'
import ProfilePage from './components/Pages/ProfilePage'
import Drawer from '@material-ui/core/Drawer'
import DrawerBar from './components/Drawer'
import { useGeneralValue } from './context/GeneralContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import './App.scss'

const App = () => {

  const [{ isDrawerOpen }, dispatch] = useGeneralValue()

  return (
    <div className='App'>
      <Router>
        <ScrollToTop />
        <Drawer
          open={isDrawerOpen}
          anchor='right'
          onClose={() => dispatch({ type: 'DRAWER_TOGGLE', open: false })}
          onOpen={() => dispatch({ type: 'DRAWER_TOGGLE', open: true })}
        >
          <DrawerBar />
        </Drawer>
        <header>
          <Header />
        </header>
        <Switch>
          <Route path='/profile' component={ProfilePage} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
