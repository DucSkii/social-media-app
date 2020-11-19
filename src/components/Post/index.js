import React, { useState, useEffect } from 'react'
import { Paper, Typography, Avatar, makeStyles, Input, Divider, IconButton } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import classNames from 'classnames'
import { Fade } from "react-slideshow-image"
import { Link } from 'react-router-dom'
import { useGeneralValue } from '../../context/GeneralContext'
import SendIcon from '@material-ui/icons/Send'
import { db } from '../../firebase'
import firebase from 'firebase'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import './styles.scss'
import { useUserValue } from '../../context/UserContext'

const useStyles = makeStyles(theme => ({
  header: {
    borderRadius: '0',
    [theme.breakpoints.up('sm')]: {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
  },
  avatar: {
    width: '23px',
    height: '23px',
    marginRight: '8px',
    [theme.breakpoints.up('sm')]: {
      width: '26px',
      height: '26px',
      marginRight: '10px',
    },
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  captionText: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '8px'
    }
  }
}))

const Post = (props) => {

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ user, userId, userDisplayName, userImage }, userDispatch] = useUserValue()
  const postHeader = classNames('post-header-paper', classes.header)

  useEffect(() => {
    setComments([])
    if (props.postId) {
      db.collection("comments")
        .where("postId", "==", props.postId)
        .orderBy('timestamp', 'desc').get() // grabbing comment linked to post
        .then(queryCommentSnapshot => {
          queryCommentSnapshot.forEach(comment => {
            const commentData = comment.data()

            db.collection("users").where("uid", "==", commentData.uid).get() // grabbing user linked to comment uid
              .then(queryUserSnapshot => {
                queryUserSnapshot.forEach(user => {
                  const userData = { // new object for username and avatar
                    username: user.data().username,
                    avatar: user.data().avatar,
                  }
                  setComments(prevState => [...prevState, { ...commentData, ...userData }])
                })
              })
          })
        })
    }
  }, [])

  const postComment = (event) => {
    event.preventDefault()

    let commentObj = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      uid: userId,
      postId: props.postId,
      username: userDisplayName,
      avatar: userImage,
    }

    db.collection("comments").add({
      timestamp: commentObj.timestamp,
      text: commentObj.text,
      uid: commentObj.uid,
      postId: commentObj.postId,
    }).then(() => {
      setComments(prevState => [commentObj, ...prevState])
    }).catch(error => console.log(error))

    setComment('')
  }

  const properties = {
    autoplay: false,
    transitionDuration: 200,
    indicators: true,
    prevArrow:
      <div style={{ width: "30px", marginRight: "-30px" }}>
        <IconButton>
          <KeyboardArrowLeftIcon style={{ backgroundColor: 'RGBA(255,255,255,0.5)', borderRadius: '20px' }} />
        </IconButton>
      </div>,
    nextArrow:
      <div style={{ width: "30px", marginLeft: "-48px" }}>
        <IconButton>
          <KeyboardArrowRightIcon style={{ backgroundColor: 'RGBA(255,255,255,0.5)', borderRadius: '20px', }} />
        </IconButton>
      </div>,
  }

  const renderImage = () => {
    if (props.image.length > 1) {
      return (
        <Fade {...properties}>
          {
            props.image.map((image, index) => {
              return (
                <div key={index} style={{ width: '100%' }}>
                  <img src={image} alt='' className='post-image' />
                </div>
              )
            })
          }
        </Fade>
      )
    } else {
      return <img src={props.image} alt='' className='post-image' />
    }
  }

  return (
    <div className='post' style={{ border: 'none' }}>
      <header className='post-header'>
        <Paper variant='outlined' square className={postHeader} style={{ backgroundColor: props.postBannerColour }}>
          <Link to={`/profile/${props.username}/${props.uid}`}
            className={classes.link}
            style={{ color: darkMode ? '#fff' : '#000000' }}
          >
            <Avatar src={props.avatar} className={classes.avatar} />
            <Typography style={{ fontSize: '12px' }}><strong>{props.username}</strong></Typography>
          </Link>
        </Paper>
      </header>
      {
        Array.isArray(props.image) &&
        <>
          {renderImage()}
        </>
      }
      <Paper square >
        <footer className='post-footer'>
          {props.image.length ? (
            <Typography style={{ fontSize: '13px' }} className={classes.captionText}>
              <strong>{props.username}</strong> {props.caption}
            </Typography>
          ) : (
              <Typography style={{ fontSize: '14px' }} className={classes.captionText}>
                <strong>{props.caption}</strong>
              </Typography>
            )}
        </footer>
      </Paper>
      <Paper square variant='outlined' style={{ border: 'none' }}>
        <div>
          {
            comments.map((comment, index) => {
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '0px 10px', paddingBottom: '5px' }}>
                  <Link
                    to={`/profile/${comment.username}/${comment.uid}`}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      color: darkMode ? '#fff' : '#000000'
                    }}
                  >
                    <Avatar src={comment.avatar} className={classes.avatar} />
                    <Typography style={{ fontSize: '12px' }}>
                      <strong>{comment.username}</strong>
                    </Typography>
                  </Link>
                  <Typography style={{ fontSize: '11px', marginLeft: '5px' }}>
                    {comment.text}
                  </Typography>
                </div>
              )
            })
          }
        </div>
      </Paper>
      {user &&
        <>
          <Divider style={{ backgroundColor: darkMode ? '#666' : 'lightgrey' }} />
          <Paper
            variant='outlined'
            square
            style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
            }}>
            <form className='post-footer' onSubmit={postComment}>
              <Input
                type='text'
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Add a comment...'
                style={{
                  fontSize: '13px',
                  padding: '0px 5px',
                  width: '100%',
                }}
              />
              <span hidden={!comment}>
                <IconButton type='submit' style={{ padding: '0', margin: '0' }}>
                  <SendIcon />
                </IconButton>
              </span>
            </form>
          </Paper>
        </>
      }
    </div>
  )
}

export default Post