import React, { useState } from 'react'
import { useGeneralValue } from '../../../context/GeneralContext'
import { useUserValue } from '../../../context/UserContext'
import { Paper, Grid, Input, Avatar, Button, IconButton, Typography } from '@material-ui/core'
import { storage } from '../../../firebase'
import CreateIcon from '@material-ui/icons/Create'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase'
import firebase from 'firebase'

import { useStyles } from './styles'

const EditProfile = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userImage, userDisplayName, userId, userBanner, selectBanner }, userDispatch] = useUserValue()
  const [imagePreview, setImagePreview] = useState(null)
  const [image, setImage] = useState(null)
  const [edit, setEdit] = useState(false)
  const [newUsername, setNewUsername] = useState('')
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
          .then(async (url) => {
            user.updateProfile({
              photoURL: url,
            })
            db.doc(`/users/${userId}`).update({
              avatar: url,
            })

            const queryPostImage = await db.collectionGroup("posts").where("uid", "==", userId).get()
            queryPostImage.docs.forEach(snapshot => {
              snapshot.ref.update({
                avatar: url,
              })
            })

            const queryCommentImage = await db.collectionGroup("comments").where("uid", "==", userId).get()
            queryCommentImage.docs.forEach(snapshot => {
              snapshot.ref.update({
                avatar: url,
              })
            })

            const queryMessages = await db.collectionGroup("messages").where("uid", "==", userId).get()
            queryMessages.docs.forEach(snapshot => {
              snapshot.ref.update({
                avatar: url,
              })
            })

            userDispatch({ type: 'SET_IMAGE', image: url })
            setImage(null)
            setImagePreview(null)
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

  const renderChangeName = () => {
    if (edit === false) {
      return (
        <>
          <Input variant='contained' value={userDisplayName} disabled />
          <IconButton onClick={() => setEdit(true)} className={classes.button}>
            <CreateIcon />
          </IconButton>
        </>
      )

    } else {
      return (
        <>
          <Input variant='contained' placeholder='Enter new username'
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
          />
          <IconButton onClick={handleCancel} className={classes.button}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handleChangeUsername} className={classes.button}>
            <CheckCircleIcon />
          </IconButton>
        </>
      )
    }
  }

  const handleCancel = () => {
    setEdit(false)
    setNewUsername('')
  }

  const handleChangeUsername = async () => {
    const usernameList = []
    const getUsername = await db.collection("users").get()
    getUsername.forEach(user => {
      usernameList.push(user.data().username)
    })
    if (usernameList.includes(newUsername)) {
      return alert('Username is taken')
    }

    if (newUsername === '' || newUsername === userDisplayName) {
      alert('Please enter a new username')
    } else {
      user.updateProfile({
        displayName: newUsername,
      })
      db.doc(`/users/${userId}`).update({
        username: newUsername,
      })

      const queryPosts = await db.collectionGroup("posts").where("uid", "==", userId).get()
      queryPosts.docs.forEach(snapshot => {
        snapshot.ref.update({
          username: newUsername,
        })
      })

      const queryComments = await db.collectionGroup("comments").where("uid", "==", userId).get()
      queryComments.docs.forEach(snapshot => {
        snapshot.ref.update({
          username: newUsername,
        })
      })


      userDispatch({ type: 'SET_DISPLAYNAME', name: newUsername })
      setEdit(false)
      setNewUsername('')
    }
  }

  const setBannerColour = async () => {
    db.doc(`/users/${userId}`).update({
      postBannerColour: selectBanner,
    }).then(() => {
      userDispatch({ type: 'SET_BANNER', banner: selectBanner })
    })

    const queryPostsBanner = await db.collectionGroup("posts").where("uid", "==", userId).get()
    queryPostsBanner.docs.forEach(snapshot => {
      snapshot.ref.update({
        postBannerColour: selectBanner,
      })
    })
  }

  return (
    <div className={classes.profile} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
      <Paper square variant='outlined' className={classes.paper} style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        <Grid container>
          <Grid item xs={12}>
            <Link to={`/profile/${userDisplayName}/${userId}`}>
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              {renderAvatar()}
            </Grid>
            <Grid item xs={1} className={classes.gridBreakpoint} />
            <Grid container item xs={7}>
              <Grid container item xs={12} className={classes.changePicture}>
                <Button variant='outlined' component='label' className={classes.changeButton}>
                  Change Picture
                <input type='file' onChange={handleChange} onClick={(e) => e.target.value = null} hidden />
                </Button>
              </Grid>
              {
                imagePreview &&
                <>
                  <Grid item xs={12} style={{ height: '15px' }} />
                  <Grid container item xs={12} className={classes.gridButtonContainer}>
                    <Grid container item xs={5} sm={3} className={classes.gridButton}>
                      <Button variant='outlined' className={classes.button} onClick={() => setImagePreview(null)}>Cancel</Button>
                    </Grid>
                    <Grid item xs={2} className={classes.smHidden}></Grid>
                    <Grid container item xs={5} sm={3} className={classes.gridButton}>
                      <Button variant='outlined' className={classes.button} onClick={handleImageUpload}>Confirm</Button>
                    </Grid>
                  </Grid>
                </>
              }
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid item xs={12} style={{ height: '40px' }} />
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid container item xs={10} style={{ alignItems: 'center' }}>
              {renderChangeName()}
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid item xs={12} style={{ height: '40px' }} />
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid container item xs={10}>
              <Grid item xs={12}>
                <Typography variant='h4' style={{ fontSize: '20px' }}>Post Banner Colour</Typography>
              </Grid>
              <Grid item xs={12} style={{ height: '15px' }} />
              <Grid container item xs={12}>
                <Grid item xs={2} sm={1}>
                  <Paper
                    id={null}
                    className={classes.postBannerColour}
                    style={{ backgroundColor: null }}
                    onClick={e => userDispatch({ type: 'SELECT_BANNER', banner: null })}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <div
                    id='#6AE3BD'
                    className={classes.postBannerColour}
                    style={{ backgroundColor: '#6AE3BD' }}
                    onClick={e => userDispatch({ type: 'SELECT_BANNER', banner: e.target.id })}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <div
                    id='#8A6FE7'
                    className={classes.postBannerColour}
                    style={{ backgroundColor: '#8A6FE7' }}
                    onClick={e => userDispatch({ type: 'SELECT_BANNER', banner: e.target.id })}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <div
                    id='#E76F78'
                    className={classes.postBannerColour}
                    style={{ backgroundColor: '#E76F78' }}
                    onClick={e => userDispatch({ type: 'SELECT_BANNER', banner: e.target.id })}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <div
                    id='#61DA68'
                    className={classes.postBannerColour}
                    style={{ backgroundColor: '#61DA68' }}
                    onClick={e => userDispatch({ type: 'SELECT_BANNER', banner: e.target.id })}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ height: '15px' }} />
              <Grid container item xs={12}>
                <Paper
                  className={classes.postBannerConfirm}
                  style={{
                    backgroundColor: userBanner,
                    marginRight: '10px',
                  }}
                />
                <Button disableRipple>Current Colour</Button>
              </Grid>
              <Grid item xs={12} style={{ height: '15px' }} />
              {
                userBanner !== selectBanner &&
                <Grid container item xs={12}>
                  <Paper
                    className={classes.postBannerConfirm}
                    style={{
                      backgroundColor: selectBanner,
                      marginRight: '10px',
                    }}
                  />
                  <Button onClick={setBannerColour}>Save Colour</Button>
                </Grid>
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