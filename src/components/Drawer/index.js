import React from 'react'
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
import { useGeneralValue } from '../../context/GeneralContext'
import { makeStyles, Button, Avatar } from '@material-ui/core'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  navigation: {
    padding: '10px',
  },
  button: {
    padding: '0',
    margin: '0',
    maxWidth: '40px',
    minWidth: '40px',
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
})

const Drawer = () => {

  const [{ isDrawerOpen }, dispatch] = useGeneralValue()
  const classes = useStyles()

  const signOut = () => {
    auth.signOut()
    dispatch({ type: 'DRAWER_TOGGLE', open: false })
  }

  return (
    <div className='drawer' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div className='drawer-navigation' style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: 'center' }}>
        <Button className={classes.button} onClick={() => dispatch({ type: 'DRAWER_TOGGLE', open: false })}>
          <ArrowBackIosIcon style={{ padding: '10px 10px 10px 15px', width: '20px', height: '20px' }} />
        </Button>
        <Divider className={classes.divider} />
        <Link to='/'>
          <Button className={classes.button}>
            <HomeOutlinedIcon className={classes.navigation} />
          </Button>
        </Link>
        <Button className={classes.button}>
          <ChatOutlinedIcon className={classes.navigation} />
        </Button>
        <Button className={classes.button}>
          <FavouriteBorderOutlinedIcon className={classes.navigation} />
        </Button>
        <Link to='/profile'>
          <Button className={classes.buttonAvatar}>
            <Avatar className={classes.avatar} />
          </Button>
        </Link>
        <Divider className={classes.divider} />
      </div>
      <div className='drawer-settings' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button className={classes.button}>
          <SettingsOutlinedIcon className={classes.navigation} />
        </Button>
        <Divider className={classes.divider} />
        <Button className={classes.button} onClick={signOut}>
          <ExitToAppIcon className={classes.navigation} />
        </Button>
      </div>
    </div>
  )
}

export default Drawer