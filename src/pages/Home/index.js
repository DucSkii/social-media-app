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
    setPosts([])
    db.collection("posts").orderBy('timestamp', 'desc').get().then(queryPostSnapshot => {
      queryPostSnapshot.forEach(post => {
        const postData = {
          post: post.data(),
          id: post.id,
        }

        db.collection("users").where("uid", "==", post.data().uid).get().then(queryUserSnapshot => {
          queryUserSnapshot.forEach(user => {
            const userData = {
              username: user.data().username,
              avatar: user.data().avatar,
              postBannerColour: user.data().postBannerColour,
            }
            setPosts(prevState => [...prevState, { ...postData, ...userData }])
          })
        })
      })
    })
  }, [])

  return (
    <div className={classes.posts}>
      {user &&
        <UploadPost setPosts={setPosts}/>
      }
      {
        posts.map(({ id, post, username, avatar, postBannerColour }) => {
          return <Post
            key={id}
            postId={id}
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            username={username}
            avatar={avatar}
            postBannerColour={postBannerColour}
          />
        })
        // // having a unique key for each post prevents old posts from having to re-render when a new post is added
      }
    </div>
  )
}

export default Home