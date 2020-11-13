import React, { useState } from 'react'
import { Paper, Input, Button } from '@material-ui/core'
import { useStyles } from './styles'

const UploadPost = () => {

  const classes = useStyles()
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')

  return (
    <Paper variant='outlined' className={classes.paper} >
      <div className={classes.uploadPost}>
        <div className={classes.uploadInfo}>
          <Input placeholder='Enter caption' className={classes.caption} />
          <input type='file' />
        </div>
        <Button variant='outlined' className={classes.uploadButton}>Quack</Button>
      </div>
    </Paper>
  )
}

export default UploadPost