import React from 'react'
import { useGeneralValue } from '../../../context/GeneralContext'
import { Paper } from '@material-ui/core'

import { useStyles } from './styles'

const EditProfile = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()

  return (
    <div className={classes.profile}>
      <Paper square className={classes.paper} style={{ backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        <h1>Edit Profile</h1>
      </Paper>
    </div>
  )
}

export default EditProfile