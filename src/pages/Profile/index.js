import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, Grid, Button, IconButton, Modal } from '@material-ui/core'
import { Fade } from "react-slideshow-image"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { useLocation, Link } from 'react-router-dom'
import { db } from '../../firebase'
import firebase from 'firebase'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '100%',
    maxWidth: '400px',
    outline: '0',
    border: '0',
    padding: '50px'
  }
}

const Profile = () => {

  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId }, userDispatch] = useUserValue()
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [modalImage, setModalImage] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [following, setFollowing] = useState(false)
  const [text, setText] = useState('Following')
  const location = useLocation()
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
  const increment = firebase.firestore.FieldValue.increment(1)
  const decrement = firebase.firestore.FieldValue.increment(-1)

  useEffect(() => {
    const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    setImages([])
    const userUnsubscribe = db.collection("users").doc(profileId).onSnapshot(doc => {
      const userData = {
        username: doc.data().username,
        avatar: doc.data().avatar,
        posts: doc.data().posts,
        followers: doc.data().followers,
        following: doc.data().following,
      }
      setUserProfile(userData)
    })

    const unsubscribe = db.doc(`/users/${userId}`).collection("following").doc(profileId).onSnapshot(doc => {
      if (doc.data() === undefined) {
        setFollowing(false)
      } else {
        setFollowing(true)
      }
    })

    db.collection("posts").where("uid", "==", profileId).orderBy('timestamp', 'desc').get().then(queryPostSnapshot => {
      queryPostSnapshot.forEach(post => {
        if (post.data().image) {
          setImages(prevState => [...prevState, post.data().image])
        }
        return null
      })
    })

    return () => {
      userUnsubscribe()
      unsubscribe()
    }
  }, [location.pathname])

  const renderProfile = () => {

    const followUser = () => {
      db.doc(`/users/${userId}`).collection("following").doc(profileId).set({})
      db.doc(`/users/${userId}`).update({ following: increment })
      db.doc(`/users/${profileId}`).collection("followers").doc(userId).set({})
      db.doc(`/users/${profileId}`).update({ followers: increment })
    }

    const unFollowUser = () => {
      db.doc(`/users/${userId}`).collection("following").doc(profileId).delete()
      db.doc(`/users/${userId}`).update({ following: decrement })
      db.doc(`/users/${profileId}`).collection("followers").doc(userId).delete()
      db.doc(`/users/${profileId}`).update({ followers: decrement })
    }

    const renderButton = () => {
      if (userId) {
        if (location.pathname.includes(userId)) {
          return (
            <>
              <Link to='/editprofile' style={{ textDecoration: 'none', padding: '0', margin: '0', width: '120px' }}>
                <Button
                  variant='outlined'
                  style={{ fontSize: '12px', padding: '0px 5px', minWidth: '120px' }}
                >
                  Edit Profile
                </Button>
              </Link>
            </>
          )
        }
        return (
          <>
            {(following === true) ? (
              <Button
                variant='outlined'
                className={classes.following}
                style={{ fontSize: '12px', padding: '0px 5px', minWidth: '120px' }}
                onClick={unFollowUser}
                onMouseOver={() => setText('Unfollow')}
                onMouseLeave={() => setText('Following')}
              >
                {text}
              </Button>
            ) : (
                <Button
                  variant='outlined'
                  style={{ fontSize: '12px', padding: '0px 5px', minWidth: '120px' }}
                  onClick={followUser}
                >
                  Follow
                </Button>
              )}
          </>
        )
      }
      return null
    }

    const handleClose = () => {
      setOpen(false)
      setModalImage([])
    }

    const imageClicked = (image) => {
      setModalImage(image)
      setOpen(true)
    }

    const renderImages = () => {
      const properties = {
        autoplay: false,
        transitionDuration: 200,
        prevArrow:
          <div style={{ width: "30px", marginRight: "-30px" }}>
            <IconButton>
              <KeyboardArrowLeftIcon className={classes.arrowIcon} />
            </IconButton>
          </div>,
        nextArrow:
          <div className={classes.arrowRight}>
            <IconButton>
              <KeyboardArrowRightIcon className={classes.arrowIcon} />
            </IconButton>
          </div>,
      }

      if (images.length) {
        return images.map((image, index) => {
          if (image.length === 1) {
            return (
              <Grid item xs={4}
                key={index}
                style={{ display: 'flex', alignItems: 'center', border: '1px solid #4F4F4F' }}
              >
                <img src={image[0]} alt=''
                  style={{
                    width: '100%',
                    objectFit: 'contain',
                    maxHeight: '176px',
                  }}
                  onClick={() => imageClicked(image)}
                />
              </Grid>
            )
          } else {
            return (
              <Grid item xs={4}
                key={index}
                style={{ border: '1px solid #4F4F4F', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Fade {...properties} style={{ maxHeight: '176px' }}>
                  {
                    image.map((img, index) => {
                      return (
                        <div key={index} style={{ width: '100%' }}>
                          <img src={img} alt=''
                            style={{
                              width: '100%',
                              objectFit: 'contain',
                              maxHeight: '176px',
                            }}
                            onClick={() => imageClicked(image)}
                          />
                        </div>
                      )
                    })
                  }
                </Fade>
              </Grid>
            )
          }
        })
      } else {
        return (
          <div style={{ width: '100%', textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>
            No images
          </div>
        )
      }
    }

    const properties = {
      autoplay: false,
      transitionDuration: 200,
      indicators: true,
      prevArrow:
        <div style={{ width: "30px", marginRight: "-30px" }}>
          <IconButton>
            <KeyboardArrowLeftIcon className={classes.arrowIcon} />
          </IconButton>
        </div>,
      nextArrow:
        <div className={classes.arrowRight}>
          <IconButton>
            <KeyboardArrowRightIcon className={classes.arrowIcon} />
          </IconButton>
        </div>,
    }

    return (
      <div className={classes.body}>
        < Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.modal}>
            {(modalImage.length === 1) ? (
              <>
                <img src={modalImage} alt='' />
              </>
            ) : (
                <>
                  <Fade {...properties} style={{ maxHeight: '176px', width: '100%' }}>
                    {
                      modalImage.map((img, index) => {
                        return (
                          <div key={index} style={{ width: '100%' }}>
                            <img src={img} alt=''
                              style={{
                                width: '100%',
                                objectFit: 'contain',
                                maxHeight: '176px',
                              }}
                            />
                          </div>
                        )
                      })
                    }
                  </Fade>
                </>
              )}
          </div>
        </Modal >
        <Grid container className={classes.container}>
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid item xs={1}>
              <Avatar src={userProfile.avatar} className={classes.avatar} />
              <Typography style={{ fontSize: '15px', marginTop: '10px', minWidth: '80px' }}>{userProfile.username}</Typography>
            </Grid>
            <Grid item xs={1} style={{ marginRight: '10px' }} />
            <Grid container item xs={8} className={classes.detailContainer}>
              <Grid item xs={2}>
                <Typography className={classes.detailTitle}>Posts</Typography>
                <Typography className={classes.detailNumber}>{userProfile.posts}</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Typography className={classes.detailTitle}>Followers</Typography>
                <Typography className={classes.detailNumber}>{userProfile.followers}</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Typography className={classes.detailTitle}>Following</Typography>
                <Typography className={classes.detailNumber}>{userProfile.following}</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid container item xs={12}>
                <Grid item xs={3} />
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  {renderButton()}
                </Grid>
                <Grid item xs={5} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ height: '50px' }} />
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Typography style={{ textAlign: 'center' }}>Images</Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} style={{ height: '30px' }} />
            <Grid item xs={1} />
            <Grid container item xs={10}>
              {renderImages()}
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.profile} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
      <Paper square variant='outlined' className={classes.paper} style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        {renderProfile()}
      </Paper>
    </div>
  )
}

export default Profile