import React, { useState } from 'react'
import { Paper, Input, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { db, storage } from '../../../firebase'
import { useUserValue } from '../../../context/UserContext'
import firebase from 'firebase'

const UploadPost = () => {

  const classes = useStyles()
  const [{ userDisplayName }, dispatch] = useUserValue()
  const [image, setImage] = useState('')
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
      const uploadTask = storage.ref(`images/${image.name}`).put(image)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          // error func
          console.log(error)
        },
        //complete func
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              // post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp,
                caption: caption,
                image: url,
                username: userDisplayName
              })
            })
        },
      )
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