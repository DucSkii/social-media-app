import React, { useState } from 'react'
import { Paper, Input, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { db, storage } from '../../../firebase'
import { useUserValue } from '../../../context/UserContext'
import firebase from 'firebase'

const UploadPost = () => {

  const classes = useStyles()
  const [{ userDisplayName, userImage, userId }, dispatch] = useUserValue()
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')
  const [images, setImages] = useState([])

  const handleChange = e => {
    if (!e.target.files.length) {
      return null
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i]
      setImages(prevState => [...prevState, newFile])
    }
  }

  const handleUpload = () => {
    if (caption === '') {
      return alert('Enter a caption')
    }
    const promises = []

    if (images.length) {
      images.forEach(image => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        promises.push(uploadTask)
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
          () => { }
        )
      })

      Promise.all(promises)
        .then(() => {
          const imageUrlPromises = []
          images.forEach(image => {
            const imageRef = storage.ref(`images/${image.name}`).getDownloadURL()
            imageUrlPromises.push(imageRef)
          })
          Promise.all(imageUrlPromises).then((images) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              image: images,
              username: userDisplayName,
              avatar: userImage,
              uid: userId,
            })
            setImages([])
            setProgress(0)
            setCaption('')
          }).catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    } else {
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        image: '',
        username: userDisplayName,
        avatar: userImage,
        uid: userId,
      })
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
            <input type='file' multiple onChange={handleChange} onClick={e => e.target.value = null} />
          </div>
          <Button variant='outlined' className={classes.uploadButton} onClick={handleUpload}>Quack</Button>
        </div>
        <progress value={progress} max='100' style={{ width: '80%' }} />
      </div>
    </Paper>
  )
}

export default UploadPost