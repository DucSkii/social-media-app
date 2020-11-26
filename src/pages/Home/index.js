import React, { useState, useEffect } from 'react'
import Post from '../../components/Post'
import UploadPost from '../../components/Post/UploadPost'
import { useUserValue } from '../../context/UserContext'
import { db } from '../../firebase'
import { useStyles } from './styles'

const Home = () => {

  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [{ user }, userDispatch] = useUserValue()

  useEffect(() => {
    const unsubscribe = db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className={classes.posts}>
      {user &&
        <UploadPost />
      }
      {
        posts.map(({ id, post }) => {
          return <Post
            key={id}
            postId={id}
            likes={post.likes}
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            username={post.username}
            avatar={post.avatar}
            postBannerColour={post.postBannerColour}
          />
        })
        // // // having a unique key for each post prevents old posts from having to re-render when a new post is added
      }
    </div>
  )
}

export default Home