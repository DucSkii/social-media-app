import React from 'react'
import { useStyles } from './styles'
import { Paper, Typography, Switch, Button } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { db } from '../../firebase'

const Settings = () => {

  const classes = useStyles()
  const [{ darkMode, colorTheme, dbTheme }, dispatch] = useGeneralValue()
  const [{ userId }, userDispatch] = useUserValue()

  const toggleDarkMode = () => {
    dispatch({ type: 'DARKMODE_TOGGLE', mode: !darkMode })
  }

  const selectColour = e => {
    dispatch({ type: 'SELECT_THEME', id: e.target.id })
  }


  const setTheme = () => {
    if (dbTheme.dbDarkMode !== darkMode || dbTheme.dbColourTheme !== colorTheme.id) {
      return (
        <Button style={{ margin: '20px' }} onClick={saveChanges}>SAVE CHANGES</Button>
      )
    } 
    return null
  }

  const saveChanges = () => {
    const themePayload = {
      darkMode: darkMode,
      colourTheme: colorTheme.id,
    }
    db.collection("users").doc(userId).update(themePayload)
      .then(() => {
        dispatch({ type: 'SET_THEME', themePayload })
      })
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
              onClick={toggleDarkMode}
              name='darkMode'
            />
          </div>
        </div>
        <div className={classes.colorTheme}>
          <Typography variant='h5' className={classes.colorTheme}>Colour Theme</Typography>
          <div className={classes.colors}>
            <div id={0} className={classes.colorBlack} onClick={(e) => selectColour(e)} />
            <div id={1} className={classes.colorBlue} onClick={(e) => selectColour(e)} />
            <div id={2} className={classes.colorPink} onClick={(e) => selectColour(e)} />
            <div id={3} className={classes.colorPurple} onClick={(e) => selectColour(e)} />
            <div id={4} className={classes.colorLime} onClick={(e) => selectColour(e)} />
            <div id={5} className={classes.colorOrange} onClick={(e) => selectColour(e)} />
            <div id={6} className={classes.colorTurquoise} onClick={(e) => selectColour(e)} />
            <div id={7} className={classes.colorRed} onClick={(e) => selectColour(e)} />
            <div id={8} className={classes.colorCyan} onClick={(e) => selectColour(e)} />
          </div>
        </div>
        {setTheme()}
      </div>
    </Paper >
  )
}

export default Settings