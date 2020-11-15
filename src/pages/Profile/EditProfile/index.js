import React, { useState } from 'react'
import { useGeneralValue } from '../../../context/GeneralContext'
import { useUserValue } from '../../../context/UserContext'
import { Paper, Grid, Typography, Input, Avatar, Button } from '@material-ui/core'
import { storage } from '../../../firebase'
import firebase from 'firebase'

import { useStyles } from './styles'

const EditProfile = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userImage }, setUserExists] = useUserValue()
  const [imagePreview, setImagePreview] = useState(null)
  const [image, setImage] = useState(null)
  const user = firebase.auth().currentUser

  const handleChange = e => {
    const selected = e.target.files[0]
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    setImage(selected)
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(selected)
    } else {
      alert('File type not supported')
    }
  }

  const handleImageUpload = () => {

    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            user.updateProfile({
              photoURL: url,
            })
            setImage(null)
            setImagePreview(null)
            window.location.reload()
          })
      },
    )
  }

  const renderAvatar = () => {
    if (imagePreview) {
      return <Avatar src={imagePreview} className={classes.avatar} />
    } else {
      return <Avatar src={userImage} className={classes.avatar} />
    }
  }

  return (
    <div className={classes.profile}>
      <Paper square className={classes.paper} style={{ backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              {renderAvatar()}
            </Grid>
            <Grid item xs={1} />
            <Grid container item xs={7}>
              <Grid container item xs={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button variant='outlined' component='label' className={classes.changeButton}>
                  Change Picture
                <input type='file' onChange={handleChange} onClick={(e) => e.target.value = null} hidden />
                </Button>
              </Grid>
              {
                imagePreview &&
                <>
                  <Grid item xs={12} style={{ height: '15px' }} />
                  <Grid container item xs={12} style={{ justifyContent: 'space-around' }}>
                    <Grid container item xs={5} style={{ justifyContent: 'center' }}>
                      <Button variant='outlined' className={classes.button} onClick={() => setImagePreview(null)}>Cancel</Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid container item xs={5} style={{ justifyContent: 'center' }}>
                      <Button variant='outlined' className={classes.button} onClick={handleImageUpload}>Confirm</Button>
                    </Grid>
                  </Grid>
                </>
              }
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default EditProfile