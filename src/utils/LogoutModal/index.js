import React, { useState } from 'react'
import { Button, Modal, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { useGeneralValue } from '../../context/GeneralContext'

import './styles.scss'
import { useUserValue } from '../../context/UserContext'

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
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  modalButtonLeft: {
    marginRight: '10px',
  },
  modalButtonRight: {
    marginLeft: '10px',
  },
}))

const LogoutModal = (props) => {

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ user }, userDispatch] = useUserValue()

  const signOut = () => {
    props.setOpen(false)
    dispatch({ type: 'DARKMODE_TOGGLE', mode: false })
    dispatch({ type: 'SELECT_THEME', id: 0 })
    dispatch({ type: 'CHANGE_NAV', nav: '' })
    dispatch({ type: 'DRAWER_TOGGLE', open: false })

    const payload = {
      user: null,
      displayName: null,
      uid: null,
      image: null, //add a default image
    }
    userDispatch({ type: 'SET_USER', payload })
    auth.signOut()
  }

  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    < Modal
      open={props.open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.modal}>
        <div className='modal'>
          <div style={{ color: darkMode ? '#fff' : '#000000' }}>
            Are you sure you want to sign out
          </div>
        </div>
        <div className='modal-buttons'>
          <Button variant='outlined' className={classes.modalButtonLeft} onClick={() => handleClose()}>No</Button>
          <Link to='/'>
            <Button variant='outlined' className={classes.modalButtonRight} onClick={() => signOut()}>Yes</Button>
          </Link>
        </div>
      </div>
    </Modal >
  )


}

export default LogoutModal