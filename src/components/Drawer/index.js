import React, { useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ChatIcon from '@material-ui/icons/Chat'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import FavouriteIcon from '@material-ui/icons/Favorite'
import FavouriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Divider from '@material-ui/core/Divider'
import { makeStyles, Button, Avatar, Paper } from '@material-ui/core'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import LogoutModal from '../../utils/LogoutModal'

const useStyles = makeStyles(theme => ({
  navigation: {
    padding: '10px',
  },
  button: {
    padding: '0',
    margin: '0',
    maxWidth: '44px',
    minWidth: '44px',
  },
  buttonAvatar: {
    padding: '0',
    margin: '0',
    maxWidth: '40px',
    minWidth: '40px',
    height: '44px',
  },
  divider: {
    width: '30px',
  },
  avatar: {
    width: '24px',
    height: '24px',
  },
}))

const Drawer = () => {

  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId, userDisplayName, userImage }, userDispatch] = useUserValue()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const classes = useStyles()


  const renderHome = () => {
    if (matchPath(location.pathname, { path: '/', exact: true })) {
      return <HomeIcon className={classes.navigation} />
    }
    return <HomeOutlinedIcon className={classes.navigation} />
  }

  const renderChat = () => {
    if (matchPath(location.pathname, { path: '/chat' })) {
      return <ChatIcon className={classes.navigation} />
    }
    return <ChatOutlinedIcon className={classes.navigation} />
  }

  const renderFavourite = () => {
    if (matchPath(location.pathname, { path: '/favourites' })) {
      return <FavouriteIcon className={classes.navigation} />
    }
    return <FavouriteBorderOutlinedIcon className={classes.navigation} />
  }

  const renderSettings = () => {
    if (matchPath(location.pathname, { path: '/settings' })) {
      return <SettingsIcon className={classes.navigation} />
    }
    return <SettingsOutlinedIcon className={classes.navigation} />
  }

  return (
    <div className='drawer'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        overflowX: 'hidden'
      }}>
      <LogoutModal open={open} setOpen={setOpen} />
      <div className='drawer-navigation' style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: 'center' }}>
        <Paper
          variant='outlined'
          square
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
        >
          <Button className={classes.button} onClick={() => dispatch({ type: 'DRAWER_TOGGLE', open: false, mode: darkMode })}>
            <ArrowBackIosIcon style={{ padding: '10px 10px 10px 15px', width: '20px', height: '20px' }} />
          </Button>
          <Divider className={classes.divider} />
          <Link to='/'>
            <Button className={classes.button}>
              {renderHome()}
            </Button>
          </Link>
          <Link to='/chat'>
            <Button className={classes.button}>
              {renderChat()}
            </Button>
          </Link>
          <Link to='/favourites'>
            <Button className={classes.button}>
              {renderFavourite()}
            </Button>
          </Link>
          <Link to={`/profile/${userDisplayName}/${userId}`}>
            <Button className={classes.buttonAvatar}>
              <Avatar src={userImage} className={classes.avatar} />
            </Button>
          </Link>
          <Divider className={classes.divider} />
        </Paper>
      </div>
      <div className='drawer-settings' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper
          variant='outlined'
          square
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
        >
          <Link to='/settings'>
            <Button className={classes.button}>
              {renderSettings()}
            </Button>
          </Link>
          <Divider className={classes.divider} />
          <Button className={classes.button} onClick={() => setOpen(true)}>
            <ExitToAppIcon className={classes.navigation} />
          </Button>
        </Paper>
      </div>
    </div>
  )
}

export default Drawer