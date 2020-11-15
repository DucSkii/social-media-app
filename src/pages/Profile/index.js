import React from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, Grid, Button } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { useLocation, Link } from 'react-router-dom'

const Profile = () => {

  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId, userDisplayName, userImage }, setUserExists] = useUserValue()
  const location = useLocation()
  const classes = useStyles()

  const renderProfile = () => {
    if (location.pathname.includes(userId)) {
      return (
        <div className={classes.body}>
          <Grid container className={classes.container}>
            <Grid item xs={1} />
            <Grid item xs={1}>
              <Avatar src={userImage} className={classes.avatar} />
              <Typography style={{ fontSize: '16px', marginTop: '10px' }}>{userDisplayName}</Typography>
            </Grid>
            <Grid item xs={1} style={{ marginRight: '10px' }} />
            <Grid container item xs={8} className={classes.detailContainer}>
              <Grid item xs={2}>
                <Typography className={classes.detailTitle}>Posts</Typography>
                <Typography className={classes.detailNumber}>0</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Typography className={classes.detailTitle}>Followers</Typography>
                <Typography className={classes.detailNumber}>0</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Typography className={classes.detailTitle}>Following</Typography>
                <Typography className={classes.detailNumber}>0</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid container item xs={12}>
                <Grid item xs={3} />
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link to='/editprofile' style={{ textDecoration: 'none', padding: '0', margin: '0', width: '120px' }}>
                    <Button variant='outlined' style={{ fontSize: '12px', padding: '0px 5px', minWidth: '120px' }}>Edit Profile</Button>
                  </Link>
                </Grid>
                <Grid item xs={5} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    } else {

    }
  }

  return (
    <div className={classes.profile}>
      <Paper square className={classes.paper} style={{ backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        {renderProfile()}
      </Paper>
    </div>
  )
}

export default Profile