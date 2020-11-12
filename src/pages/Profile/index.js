import React from 'react'
import { useStyles } from './styles'
import { Paper } from '@material-ui/core'

const Profile = () => {

  const classes = useStyles()

  return (
    <div className={classes.profile}>
      <Paper square style={{ height: '100vh' }}>
        <h1>PROFILE PAGE</h1>
      </Paper>
    </div>
  )
}

export default Profile