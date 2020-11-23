import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, Grid, Button, IconButton } from '@material-ui/core'
import { Fade } from "react-slideshow-image"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { useLocation, Link } from 'react-router-dom'
import { db } from '../../firebase'

const Profile = () => {

  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId }, userDispatch] = useUserValue()
  const [images, setImages] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const location = useLocation()
  const classes = useStyles()

  useEffect(() => {
    const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    setImages([])
    db.collection("users").doc(profileId).get().then(doc => {
      const userData = {
        username: doc.data().username,
        avatar: doc.data().avatar,
        posts: doc.data().posts,
        followers: doc.data().followers,
        following: doc.data().following,
      }
      setUserProfile(userData)
    })

    db.collection("posts").where("uid", "==", profileId).orderBy('timestamp', 'desc').get().then(queryPostSnapshot => {
      queryPostSnapshot.forEach(post => {
        if (post.data().image) {
          setImages(prevState => [...prevState, post.data().image])
        }
        return null
      })
    })
  }, [location.pathname])

  const renderProfile = () => {

    const renderButton = () => {
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
          <Button
            variant='outlined'
            style={{ fontSize: '12px', padding: '0px 5px', minWidth: '120px' }}
          >
            Follow
          </Button>
        </>
      )
    }

    const renderImages = () => {
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

      if (images.length) {
        return images.map((image, index) => {
          if (image.length === 1) {
            return (
              <Grid item xs={4} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={image[0]} alt=''
                  style={{
                    width: '100%',
                    objectFit: 'contain',
                    maxHeight: '176px',
                    border: '1px solid #4F4F4F',
                  }}
                />
              </Grid>
            )
          } else {
            console.log('image', image)
            return (
              <Grid item xs={4} key={index} style={{ maxHeight: '176px' }}>
                <Fade {...properties} style={{ maxHeight: '176px' }}>
                  {
                    image.map((image, index) => {
                      return (
                        <div key={index} style={{ width: '100%' }}>
                          <img src={image} alt=''
                            style={{
                              width: '100%',
                              objectFit: 'contain',
                              maxHeight: '176px',
                              border: '1px solid #4F4F4F',
                            }}
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

    return (
      <div className={classes.body}>
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