import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Paper, Grid, Button, Typography } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { Link, useLocation } from 'react-router-dom'
import { db } from '../../firebase'
import UserCard from '../../components/UserCard'

const Favourites = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId }, userDispatch] = useUserValue()
  const [followingList, setFollowingList] = useState([])
  const location = useLocation()

  useEffect(() => {
    const userList = []
    const promises = []
    const unsubscribe = db.doc(`/users/${userId}`).collection("following").onSnapshot(queryFollowingSnapshot => {
      queryFollowingSnapshot.forEach(async (user) => {
        const queryUser = db.doc(`/users/${user.id}`).get()
        promises.push(queryUser)
        const getUser = await queryUser
        const userData = {
          username: getUser.data().username,
          avatar: getUser.data().avatar,
          uid: getUser.data().uid,
        }
        userList.push(userData)
      })
      Promise.all(promises).then(() => {
        setFollowingList(userList)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [location.pathname])

  const renderUserCard = () => {
    return followingList.map((user, index) => {
      return (
        <Grid container item xs={12} style={{ marginTop: '10px' }} key={index}>
          <Grid item xs={2} />
          <Grid container item xs={8} style={{ justifyContent: 'center' }}>
            <UserCard username={user.username} avatar={user.avatar} uid={user.uid} />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      )
    })
  }

  return (
    <div className={classes.container} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
      <Paper
        square
        variant='outlined'
        className={classes.paper}
        style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
      >
        <Grid container style={{ paddingTop: '30px' }}>
          <Grid item xs={1} />
          <Grid container item xs={5} style={{ justifyContent: 'center' }}>
            <Link to='/favourites' className={classes.link}>
              <Button variant='outlined'>Following</Button>
            </Link>
          </Grid>
          <Grid container item xs={5} style={{ justifyContent: 'center' }}>
            <Link to='/followers' className={classes.link}>
              <Button variant='outlined'>Followers</Button>
            </Link>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12} style={{ height: '30px' }} />
          <Grid container item xs={12}>
            <Grid item xs={3} />
            <Grid container item xs={6} style={{ justifyContent: 'center' }}>
              <Typography variant='h4' style={{ textAlign: 'center', fontSize: '25px' }}>Following</Typography>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <Grid item xs={12} style={{ height: '20px' }} />
          {renderUserCard()}
        </Grid>
      </Paper>
    </div>
  )
}

export default Favourites