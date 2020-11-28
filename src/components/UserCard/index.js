import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, Button, Grid } from '@material-ui/core'
import { db } from '../../firebase'
import firebase from 'firebase'
import { useUserValue } from '../../context/UserContext'
import { useGeneralValue } from '../../context/GeneralContext'
import { Link, useLocation } from 'react-router-dom'

const UserCard = (props) => {

  const classes = useStyles()
  const [following, setFollowing] = useState(false)
  const [text, setText] = useState('Following')
  const [{ userId }, userDispatch] = useUserValue()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const increment = firebase.firestore.FieldValue.increment(1)
  const decrement = firebase.firestore.FieldValue.increment(-1)
  const location = useLocation()

  useEffect(() => {

    const unsubscribe = db.doc(`/users/${userId}`).collection("following").doc(props.uid).onSnapshot(doc => {
      if (doc.data() === undefined) {
        setFollowing(false)
      } else {
        setFollowing(true)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [location.pathname])

  const followUser = () => {
    db.doc(`/users/${userId}`).collection("following").doc(props.uid).set({})
    db.doc(`/users/${userId}`).update({ following: increment })
    db.doc(`/users/${props.uid}`).collection("followers").doc(userId).set({})
    db.doc(`/users/${props.uid}`).update({ followers: increment })
  }

  const unFollowUser = () => {
    db.doc(`/users/${userId}`).collection("following").doc(props.uid).delete()
    db.doc(`/users/${userId}`).update({ following: decrement })
    db.doc(`/users/${props.uid}`).collection("followers").doc(userId).delete()
    db.doc(`/users/${props.uid}`).update({ followers: decrement })
  }

  return (
    <>
      <Paper variant='outlined' style={{ width: '100%' }}>
        <Grid container style={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={2} md={1} >
            <Link to={`/profile/${props.username}/${props.uid}`} className={classes.link}>
              <Avatar src={props.avatar} className={classes.avatar} />
            </Link>
          </Grid>
          <Grid item xs={5} md={6}>
            <Link to={`/profile/${props.username}/${props.uid}`} className={classes.link}
              style={{ color: darkMode ? '#fff' : '#000000' }}
            >
              <Typography style={{ whiteSpace: 'no-wrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {props.username}
              </Typography>
            </Link>
          </Grid>
          <Grid container item xs={5} style={{ justifyContent: 'flex-end' }}>
            {(following === true) ? (
              <Button variant='outlined' style={{ padding: '5px', fontSize: '12px' }}
                onMouseOver={() => setText('Unfollow')}
                onMouseLeave={() => setText('Following')}
                onClick={unFollowUser}
              >
                {text}
              </Button>
            ) : (
                <Button variant='outlined' style={{ padding: '5px', fontSize: '12px' }}
                  onClick={followUser}
                >
                  Follow
                </Button>
              )}
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default UserCard