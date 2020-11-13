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
import classNames from 'classnames'
import { useGeneralValue } from '../../context/GeneralContext'
import { makeStyles, Button, Avatar, Modal, Paper } from '@material-ui/core'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import './styles.scss'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '250px',
    outline: '0',
    border: '0',
  };
}

const useStyles = makeStyles(theme => ({
  navigation: {
    padding: '10px',
  },
  modalButtonLeft: {
    marginRight: '10px',
  },
  modalButtonRight: {
    marginLeft: '10px',
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
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  lightTheme: {
    color: theme.palette.primary.main,
  },
  darkTheme: {
    color: theme.palette.primary.dark,
  },
}))

const Drawer = () => {

  const [{ darkMode, pageNav }, dispatch] = useGeneralValue()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  const signOut = () => {
    auth.signOut()
    setOpen(false)
    dispatch({ type: 'SELECT_THEME', id: 0 })
    dispatch({ type: 'CHANGE_NAV', nav: '' })
    dispatch({ type: 'DRAWER_TOGGLE', open: false })
  }

  const colorClass = classNames(classes.navigation, darkMode ? classes.darkTheme : classes.lightTheme)

  const renderHome = (pageNav) => {
    if (pageNav === '') {
      return <HomeIcon className={colorClass} />
    } else {
      return <HomeOutlinedIcon className={colorClass} />
    }
  }

  const renderChat = (pageNav) => {
    if (pageNav === 'chat') {
      return <ChatIcon className={colorClass} />
    } else {
      return <ChatOutlinedIcon className={colorClass} />
    }
  }

  const renderFavourite = (pageNav) => {
    if (pageNav === 'favourite') {
      return <FavouriteIcon className={colorClass} />
    } else {
      return <FavouriteBorderOutlinedIcon className={colorClass} />
    }
  }

  const renderSettings = (pageNav) => {
    if (pageNav === 'settings') {
      return <SettingsIcon className={colorClass} />
    } else {
      return <SettingsOutlinedIcon className={colorClass} />
    }
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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modal}>
          <div className='modal'>
            <div>Are you sure you want to sign out</div>
          </div>
          <div className='modal-buttons'>
            <Button variant='outlined' className={classes.modalButtonLeft} onClick={() => handleClose()}>No</Button>
            <Link to='/'>
              <Button variant='outlined' className={classes.modalButtonRight} onClick={() => signOut()}>Yes</Button>
            </Link>
          </div>
        </div>
      </Modal>
      <div className='drawer-navigation' style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: 'center' }}>
        <Paper
          variant='outlined'
          square
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
        >
          <Button className={classes.button} onClick={() => dispatch({ type: 'DRAWER_TOGGLE', open: false, mode: darkMode })}>
            <ArrowBackIosIcon className={darkMode ? classes.darkTheme : classes.lightTheme} style={{ padding: '10px 10px 10px 15px', width: '20px', height: '20px' }} />
          </Button>
          <Divider className={classes.divider} />
          <Link to='/' className={classes.link}>
            <Button className={classes.button} onClick={() => dispatch({ type: 'CHANGE_NAV', nav: '' })}>
              {renderHome(pageNav)}
            </Button>
          </Link>
          <Button className={classes.button} onClick={() => dispatch({ type: 'CHANGE_NAV', nav: 'chat' })}>
            {renderChat(pageNav)}
          </Button>
          <Button className={classes.button} onClick={() => dispatch({ type: 'CHANGE_NAV', nav: 'favourite' })}>
            {renderFavourite(pageNav)}
          </Button>
          <Link to='/profile'>
            <Button className={classes.buttonAvatar} onClick={() => dispatch({ type: 'CHANGE_NAV', nav: 'profile' })}>
              <Avatar className={classes.avatar} />
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
            <Button className={classes.button} onClick={() => dispatch({ type: 'CHANGE_NAV', nav: 'settings' })}>
              {renderSettings(pageNav)}
            </Button>
          </Link>
          <Divider className={classes.divider} />
          <Button className={classes.button} onClick={() => setOpen(true)}>
            <ExitToAppIcon className={colorClass} />
          </Button>
        </Paper>
      </div>
    </div>
  )
}

export default Drawer