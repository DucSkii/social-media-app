import React from 'react'
import { IconButton, Avatar, Button } from '@material-ui/core'
import { useUserValue } from '../../../context/UserContext'
import { Link, matchPath, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ChatIcon from '@material-ui/icons/Chat'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import FavouriteIcon from '@material-ui/icons/Favorite'
import FavouriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { useStyles } from './styles'

const DesktopIcons = () => {

  const classes = useStyles()
  const [{ userImage, userDisplayName, userId }, setUserExists] = useUserValue()
  const location = useLocation()

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
    <div className={classes.container}>
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
      <IconButton>
        <Avatar src={userImage} className={classes.avatar} />
      </IconButton>
    </div>
  )
}

export default DesktopIcons