import React, { useState } from 'react'
import { Paper, Input, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { db, storage } from '../../../firebase'
import { useUserValue } from '../../../context/UserContext'
import firebase from 'firebase'

const UploadPost = () => {

  const classes = useStyles()
  const [{ userDisplayName, userImage, userId }, dispatch] = useUserValue()
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  
  const handleUpload = () => {
    if (caption === '') {
      return alert('Please enter a caption')
    } else if (image) {
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
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                image: url,
                username: userDisplayName,
                avatar: userImage,
                uid: userId,
              })
              setProgress(0)
              setCaption('')
              setImage(null)
            })
        },
      )
    } else {
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        image: '',
        username: userDisplayName,
        avatar: userImage,
        uid: userId,
      })
      setProgress(0)
      setCaption('')
      setImage(null)
    }
  }

  return (
    <Paper variant='outlined' className={classes.paper} >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={classes.uploadPost}>
          <div className={classes.uploadInfo}>
            <Input
              placeholder='Enter caption'
              className={classes.caption}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input type='file' onChange={handleChange} onClick={e => e.target.files = null} />
          </div>
          <Button variant='outlined' className={classes.uploadButton} onClick={handleUpload}>Quack</Button>
        </div>
        <progress value={progress} max='100' style={{ width: '80%' }} />
      </div>
    </Paper>
  )
}

export default UploadPost