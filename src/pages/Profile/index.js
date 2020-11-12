import React from 'react'
import { useStyles } from './styles'

const Profile = () => {

  const classes = useStyles()

  return (
    <div className={classes.profile}>
      <h1>PROFILE PAGE</h1>
    </div>
  )
}

export default Profile