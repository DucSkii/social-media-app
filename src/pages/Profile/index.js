import React from 'react'
import { useStyles } from './styles'
import { Paper } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'

const Profile = () => {

  const [{darkMode}, dispatch] = useGeneralValue()
  const classes = useStyles()

  return (
    <div className={classes.profile}>
      <Paper square className={classes.paper} style={{backgroundColor: darkMode ? '#666' : '#fafafa'}}>
        <h1>PROFILE PAGE</h1>
      </Paper>
    </div>
  )
}

export default Profile