import React, { useState, useEffect } from 'react'
import { Paper, Avatar, IconButton, Button, Input } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import MenuIcon from '@material-ui/icons/Menu'
import { auth, db } from '../../firebase'
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
  const [{ user, userId, userDisplayName, userImage }, userDispatch] = useUserValue()
  const [openSignup, setOpenSignup] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClose = () => {
    setDisplayName('')
    setPassword('')
    setEmail('')
    setOpenSignup(false)
    setOpenLogin(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users").doc(authUser.uid).get().then((doc) => {
          const payload = {
            user: authUser,
            displayName: doc.data().username,
            uid: doc.data().uid,
            image: doc.data().avatar,
          }
          const themePayload = {
            darkMode: doc.data().darkMode,
            colourTheme: doc.data().colourTheme,
          }
          dispatch({ type: 'DARKMODE_TOGGLE', mode: doc.data().darkMode })
          dispatch({ type: 'SELECT_THEME', id: doc.data().colourTheme })
          dispatch({ type: 'SET_THEME', themePayload })
          userDispatch({ type: 'SELECT_BANNER', banner: doc.data().postBannerColour })
          userDispatch({ type: 'SET_BANNER', banner: doc.data().postBannerColour })
          userDispatch({ type: 'SET_USER', payload })
        })
      } else {
        const payload = {
          user: null,
          displayName: null,
          uid: null,
          image: null,
        }
        userDispatch({ type: 'SELECT_BANNER', banner: null })
        userDispatch({ type: 'SET_BANNER', banner: null })
        userDispatch({ type: 'SET_USER', payload })
      }
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signUp = (event) => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        db.collection("users").doc(authUser.user.uid).set({
          uid: authUser.user.uid,
          username: displayName,
          avatar: '',
          colourTheme: 0,
          darkMode: false,
          postBannerColour: null,
          following: 0,
          followers: 0,
          posts: 0,
        })

        const payload = {
          user: authUser.user,
          displayName: displayName,
          uid: authUser.user.uid,
          image: authUser.user.photoURL, //add a default image
        }
        dispatch({ type: 'DARKMODE_TOGGLE', mode: false })
        dispatch({ type: 'SELECT_THEME', id: 0 })
        userDispatch({ type: 'SELECT_BANNER', banner: null })
        userDispatch({ type: 'SET_BANNER', banner: null })
        userDispatch({ type: 'SET_USER', payload })
        return authUser.user.updateProfile({
          displayName: displayName
        })
      })
      .catch((error) => alert(error.message))
    // .catch(error handeling)
    handleClose()
  }

  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password).then((authUser) => {

      db.collection("users").doc(authUser.user.uid).get().then(doc => {
        const payload = {
          user: authUser.user,
          displayName: doc.data().username,
          uid: doc.data().uid,
          image: doc.data().avatar,
        }
        const themePayload = {
          darkMode: doc.data().darkMode,
          colourTheme: doc.data().colourTheme,
        }
        dispatch({ type: 'DARKMODE_TOGGLE', mode: doc.data().darkMode })
        dispatch({ type: 'SELECT_THEME', id: doc.data().colourTheme })
        dispatch({ type: 'SET_THEME', themePayload })
        userDispatch({ type: 'SELECT_BANNER', banner: doc.data().postBannerColour })
        userDispatch({ type: 'SET_BANNER', banner: doc.data().postBannerColour })
        userDispatch({ type: 'SET_USER', payload })
      })
    })
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
        open={openSignup}
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
                value={displayName}
                className={classes.input}
                onChange={(e) => setDisplayName(e.target.value)}
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
                <Button variant='outlined' className={classes.buttonSignUp} onClick={() => setOpenSignup(true)}>Sign-up</Button>
              </div>
            )}
        </div>
      </Paper>
    </div>
  )
}

export default Header