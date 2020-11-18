import React, { useState, useRef, useEffect } from 'react'
import {
  IconButton,
  Avatar,
  Button,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener
} from '@material-ui/core'
import { useUserValue } from '../../../context/UserContext'
import { Link, matchPath, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ChatIcon from '@material-ui/icons/Chat'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import FavouriteIcon from '@material-ui/icons/Favorite'
import FavouriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import LogoutModal from '../../../utils/LogoutModal'

import { useStyles } from './styles'

const DesktopIcons = () => {

  const classes = useStyles()
  const [{ userImage, userDisplayName, userId }, userDispatch] = useUserValue()
  const [open, setOpen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const anchorRef = useRef(null)
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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const prevOpen = useRef(open)

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div className={classes.container}>
      <LogoutModal open={logoutModal} setOpen={setLogoutModal} />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <Link to={`/profile/${userDisplayName}/${userId}`} className={classes.link}>
                    <MenuItem className={classes.menuItem}>Profile</MenuItem>
                  </Link>
                  <Link to='/editprofile' className={classes.link}>
                    <MenuItem className={classes.menuItem}>My account</MenuItem>
                  </Link>
                  <Link to='/settings' className={classes.link}>
                    <MenuItem>Settings</MenuItem>
                  </Link>
                  <MenuItem className={classes.menuItem} onClick={() => setLogoutModal(true)}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Avatar src={userImage} className={classes.avatar} />
      </IconButton>
    </div>
  )
}

export default DesktopIcons