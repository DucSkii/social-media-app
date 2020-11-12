import React from 'react'
import { useStyles } from './styles'
import { Paper, Typography, Switch } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'

const Settings = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()

  const toggleDarkMode = (darkMode) => {
    dispatch({ type: 'DARKMODE_TOGGLE', mode: !darkMode })
    localStorage.setItem('darkMode', !darkMode)
  }

  return (
    <Paper square variant='outlined' style={{ height: '100vh', backgroundColor: darkMode ? '#666' : '#fafafa' }}>
      <div className={classes.settings}>
        <div className={classes.darkMode}>
          <Typography variant='h5' className={classes.darkMode}>Dark Mode</Typography>
          <div>
            <Switch
              color='primary'
              checked={darkMode}
              onClick={() => toggleDarkMode(darkMode)}
              name='darkMode'
            />
          </div>
        </div>
        <div className={classes.colorTheme}>
          <Typography variant='h5' className={classes.colorTheme}>Colour Theme</Typography>

        </div>
      </div>
    </Paper>
  )
}

export default Settings