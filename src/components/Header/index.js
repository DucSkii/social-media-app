import React, { useState, useEffect } from 'react'
import { Paper, Avatar, IconButton, Button, Input } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import MenuIcon from '@material-ui/icons/Menu'
import { auth } from '../../firebase'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import logo from '../../images/app-logo.png'
import DesktopIcons from './DesktopIcons'

import { useStyles } from './styles'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '70%',
    outline: '0',
    border: '0',
  };
}

const Header = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId, userDisplayName, userImage }, setUserExists] = useUserValue()
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const handleClose = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setOpen(false)
    setOpenLogin(false)
  }

  // console.log('userExists', userExists)
  // console.log('userId', userId)
  // console.log('user', user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        // console.log(authUser)
        setUser(authUser)
        setUserExists({ type: 'UPDATE_USER', user: authUser })
        setUserExists({ type: 'UPDATE_DISPLAYNAME', name: authUser.displayName })
        setUserExists({ type: 'GET_UID', id: authUser.uid })
        setUserExists({ type: 'UPDATE_IMAGE', image: authUser.photoURL })
      } else {
        // user has logged out...
        setUser(null)
        dispatch({ type: 'DARKMODE_TOGGLE', mode: false })
        setUserExists({ type: 'UPDATE_USER', user: null })
        setUserExists({ type: 'UPDATE_DISPLAYNAME', name: '' })
      }
    })

    // anytime a new user is created or someone logs in/out it fires authUser

    return () => {
      // performs clean-up inbetween useEffect fires
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, username])

  const signUp = (event) => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
    handleClose()
    // .catch(error handeling)
  }

  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    handleClose()
  }

  return (
    <div className={classes.header}>
      <Modal
        open={openLogin}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modal}>
          <form onSubmit={signIn}>
            <center>
              <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                <img src={logo} alt='logo' style={{ height: '60px' }} />
              </div>
              <Input
                required
                type='email'
                placeholder='Email'
                value={email}
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                required
                type='password'
                placeholder='Password'
                value={password}
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <Button type='submit' variant='outlined' style={{ marginTop: '15px' }}>Login</Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modal}>
          <form onSubmit={signUp}>
            <center>
              <div style={{ marginBottom: '15px', marginTop: '15px' }} >
                <img src={logo} alt='logo' style={{ height: '60px' }} />
              </div>
              <Input
                required
                type='text'
                placeholder='Username'
                value={username}
                className={classes.input}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                required
                type='email'
                placeholder='Email'
                value={email}
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                required
                type='password'
                placeholder='Password'
                value={password}
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <Button type='submit' variant='outlined' style={{ marginTop: '15px' }}>Sign-Up</Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>
      <Paper
        className={classes.header}
        variant='outlined'
        square
        style={{ borderTop: 'none' }}
      >
        <div
          className={classes.headerContainer}
          style={{
            backgroundColor: darkMode ? '#424242' : '#fff'
          }}
        >
          <Link to='/' onClick={() => dispatch({ type: 'CHANGE_NAV', nav: '' })} >
            <div>
              <img src={logo} alt='logo' style={{ height: '35px', marginLeft: '10px' }} />
            </div>
          </Link>
          {user ? (
            <>
              <div className={classes.headerIcons}>
                <Link to={`/profile/${userDisplayName}/${userId}`}>
                  <IconButton size='small'>
                    <Avatar src={userImage} className={classes.avatar} />
                  </IconButton>
                </Link>
                <IconButton size='medium' onClick={() => dispatch({ type: 'DRAWER_TOGGLE', open: true, mode: darkMode })}>
                  <MenuIcon />
                </IconButton>
              </div>
              <DesktopIcons />
            </>
          ) : (
              <div>
                <Button className={classes.buttonLogin} onClick={() => setOpenLogin(true)}>Login</Button>
                <Button variant='outlined' className={classes.buttonSignUp} onClick={() => setOpen(true)}>Sign-up</Button>
              </div>
            )}
        </div>
      </Paper>
    </div>
  )
}

export default Header