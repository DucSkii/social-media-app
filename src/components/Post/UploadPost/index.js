import React, { useState } from 'react'
import { Paper, Input, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { db, storage } from '../../../firebase'

const UploadPost = () => {

  const classes = useStyles()
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')

  const handleChange = e => {
    if (e.target.files) {
      setImage(e.target.files)
    }
  }

  const handleUpload = () => {
    if (caption === '') {
      return alert('Please enter a caption')
    } else {
      return alert('Success')
    }
  }

  return (
    <Paper variant='outlined' className={classes.paper} >
      <div className={classes.uploadPost}>
        <div className={classes.uploadInfo}>
          <Input
            placeholder='Enter caption'
            className={classes.caption}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input type='file' onChange={handleChange} />
        </div>
        <Button variant='outlined' className={classes.uploadButton} onClick={handleUpload}>Quack</Button>
      </div>
    </Paper>
  )
}

export default UploadPost