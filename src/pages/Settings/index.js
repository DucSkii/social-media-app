import React from 'react'
import { useStyles } from './styles'
import { Paper, Typography, Switch } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'

const Settings = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()



  return (
    <Paper square variant='outlined'>
      <div className={classes.settings}>
        <div className={classes.darkMode}>
          <Typography variant='h5' className={classes.darkMode}>Dark Mode</Typography>
          <Switch
            color='primary'
            checked={darkMode}
            onChange={() => dispatch({ type: 'DARKMODE_TOGGLE', mode: !darkMode })}
            name='darkMode'
          />
        </div>
      </div>
    </Paper>
  )
}

export default Settings