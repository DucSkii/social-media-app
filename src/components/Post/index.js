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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

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
    [theme.breakpoints.up('md')]: {
      width: '30px',
      height: '30px',
      marginRight: '12px',
    },
  },
  commentAvatar: {
    width: '17px',
    height: '17px',
    marginRight: '8px',
    [theme.breakpoints.up('sm')]: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
    },
    [theme.breakpoints.up('md')]: {
      width: '23px',
      height: '23px',
      marginRight: '12px',
    },
  },
  commentUsername: {
    fontSize: '11px',
    [theme.breakpoints.up('md')]: {
      fontSize: '13px',
    },
  },
  commentText: {
    fontSize: '11px',
    marginLeft: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '13px',
      marginLeft: '7px',
    }
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  captionText: {
    fontSize: '13px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
      marginLeft: '8px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '15px',
    },
  },
  captionTextNoImage: {
    padding: '10px 5px',
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
      marginLeft: '8px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  moreComments: {
    fontSize: '13px',
    padding: '15px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  postUsername: {
    fontSize: '13px',
    [theme.breakpoints.up('md')]: {
      fontSize: '15px',
    },
  },
}))

const Post = (props) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ user, userId, userDisplayName, userImage, userBanner }, userDispatch] = useUserValue()
  const [liked, setLiked] = useState(false)
  const postHeader = classNames('post-header-paper', classes.header)
  const increment = firebase.firestore.FieldValue.increment(1)
  const decrement = firebase.firestore.FieldValue.increment(-1)

  useEffect(() => {
    const unsubscribe = db.collection("comments")
      .where("postId", "==", props.postId)
      .orderBy('timestamp', 'desc')
      .limit(3)
      .onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => doc.data()))
      })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userId) {
      const unsubscribe = db.collection("posts").doc(props.postId).collection("likes").doc(userId).onSnapshot(doc => {
        if (doc.data() === undefined) {
          setLiked(false)
        } else {
          setLiked(true)
        }
      })

      return () => {
        unsubscribe()
      }
    }
    return null
  }, [userId])

  const addLike = (e) => {
    db.collection("posts").doc(e).collection("likes").doc(userId).set({})
    db.doc(`/posts/${e}`).update({
      likes: increment,
    })
  }

  const removeLike = (e) => {
    db.collection("posts").doc(e).collection("likes").doc(userId).delete()
    db.doc(`/posts/${e}`).update({
      likes: decrement,
    })
  }

  const postComment = (event) => {
    event.preventDefault()

    let commentObj = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      uid: userId,
      postId: props.postId,
      username: userDisplayName,
      avatar: userImage,
      postBannerColour: userBanner,
    }

    db.collection("comments").add({
      timestamp: commentObj.timestamp,
      text: commentObj.text,
      uid: commentObj.uid,
      postId: commentObj.postId,
      username: commentObj.username,
      avatar: commentObj.avatar,
      postBannerColour: commentObj.postBannerColour,
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

  const showMore = (e) => {
    let commentsLength = comments.length
    db.collection("comments")
      .where("postId", "==", e)
      .orderBy('timestamp', 'desc')
      .limit(commentsLength + 3)
      .get()
      .then(queryCommentsSnapshot => {
        const moreComments = []
        queryCommentsSnapshot.forEach(comment => {
          moreComments.push(comment.data())
        })
        setComments(moreComments)
      })
  }

  const renderComments = () => {
    if (comments.length >= 3) {
      return (
        <>
          {comments.map((comment, index) => {
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
                  <Avatar src={comment.avatar} className={classes.commentAvatar} />
                  <Typography className={classes.commentUsername}>
                    <strong>{comment.username}</strong>
                  </Typography>
                </Link>
                <Typography className={classes.commentText}>
                  {comment.text}
                </Typography>
              </div>
            )
          })}
          <Typography variant='h4' className={classes.moreComments} onClick={() => showMore(props.postId)}>Show more comments</Typography>
        </>
      )
    } else {
      return (
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
                <Avatar src={comment.avatar} className={classes.commentAvatar} />
                <Typography className={classes.commentUsername}>
                  <strong>{comment.username}</strong>
                </Typography>
              </Link>
              <Typography className={classes.commentText}>
                {comment.text}
              </Typography>
            </div>
          )
        })
      )
    }
  }

  return (
    <div className='post'>
      <header className='post-header'>
        <Paper variant='outlined' square className={postHeader} style={{ backgroundColor: props.postBannerColour }}>
          <Link to={`/profile/${props.username}/${props.uid}`}
            className={classes.link}
            style={{ color: darkMode ? '#fff' : '#000000' }}
          >
            <Avatar src={props.avatar} className={classes.avatar} />
            <Typography className={classes.postUsername}><strong>{props.username}</strong></Typography>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography className={classes.captionText}>
                <strong>{props.username}</strong> {props.caption}
              </Typography>
              {userId ? (
                (liked === false) ? (
                  <div style={{
                    display: 'flex',
                    paddingRight: '10px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '50px',
                  }}>
                    <IconButton style={{ padding: '0' }} onClick={() => addLike(props.postId)}><FavoriteBorderIcon /></IconButton>
                    <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                  </div>
                ) : (
                    <div style={{
                      display: 'flex',
                      paddingRight: '10px',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '50px',
                    }}>
                      <IconButton style={{ padding: '0' }} onClick={() => removeLike(props.postId)}><FavoriteIcon /></IconButton>
                      <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                    </div>
                  )
              ) : (
                  <div style={{
                    display: 'flex',
                    paddingRight: '10px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '50px',
                  }}>
                    <IconButton style={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                    <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                  </div>
                )}
            </div>
          ) : (
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography className={classes.captionTextNoImage}>
                  <strong>{props.caption}</strong>
                </Typography>
                {userId ? (
                  (liked === false) ? (
                    <div style={{
                      display: 'flex',
                      paddingRight: '10px',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '50px',
                    }}>
                      <IconButton style={{ padding: '0' }} onClick={() => addLike(props.postId)}><FavoriteBorderIcon /></IconButton>
                      <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                    </div>
                  ) : (
                      <div style={{
                        display: 'flex',
                        paddingRight: '10px',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '50px',
                      }}>
                        <IconButton style={{ padding: '0' }} onClick={() => removeLike(props.postId)}><FavoriteIcon /></IconButton>
                        <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                      </div>
                    )
                ) : (
                    <div style={{
                      display: 'flex',
                      paddingRight: '10px',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '50px',
                    }}>
                      <IconButton style={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                      <Typography style={{ fontSize: '10px', textAlign: 'center' }}>{props.likes} likes</Typography>
                    </div>
                  )}
              </div>
            )}
        </footer>
      </Paper>
      <Paper square variant='outlined' style={{ border: 'none' }}>
        <div>
          {renderComments()}
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