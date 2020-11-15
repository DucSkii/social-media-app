import React, { useState } from 'react'
import { useGeneralValue } from '../../../context/GeneralContext'
import { Paper, Grid, Typography, Input, Avatar, Button } from '@material-ui/core'

import { useStyles } from './styles'

const EditProfile = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [image, setImage] = useState(null)

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  console.log('image', image)
  return (
    <div className={classes.profile}>
      <Paper square className={classes.paper} style={{ backgroundColor: darkMode ? '#666' : '#fafafa' }}>
        <Grid container style={{ paddingTop: '20px' }}>
          <Grid container item xs={12}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              <Avatar className={classes.avatar} />
            </Grid>
            <Grid item xs={1} />
            <Grid container item xs={7}>
              <Grid container item xs={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button variant='outlined' component='label' className={classes.changeButton}>
                  Change Picture
                <input type='file' onChange={handleChange} hidden />
                </Button>
              </Grid>
              {
                image &&
                <>
                  <Grid item xs={12} style={{ height: '15px' }} />
                  <Grid container item xs={12} style={{ justifyContent: 'space-around' }}>
                    <Grid container item xs={5} style={{ justifyContent: 'center' }}>
                      <Button variant='outlined' className={classes.button} onClick={() => setImage(null)}>Cancel</Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid container item xs={5} style={{ justifyContent: 'center' }}>
                      <Button variant='outlined' className={classes.button}>Confirm</Button>
                    </Grid>
                  </Grid>
                </>
              }
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default EditProfile