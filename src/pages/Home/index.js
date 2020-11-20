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
        db.collection("users").doc(post.data().uid).get().then(doc => {
          const userData = {
            username: doc.data().username,
            avatar: doc.data().avatar,
            postBannerColour: doc.data().postBannerColour,
          }
          Object.assign(postData, userData)
          // postData.push(userData)
        })
        setPosts(prevState => [...prevState, postData])
        // setPosts()
        // .then(queryUserSnapshot => {
        //   console.log('queryUserSnapshot', queryUserSnapshot.docs)
        //   queryUserSnapshot.forEach(user => {
        //     const userData = {
        //       username: user.data().username,
        //       avatar: user.data().avatar,
        //       postBannerColour: user.data().postBannerColour,
        //     }
        //     // setPosts(prevState => [...prevState, { ...userData, ...postData }])
        //   })
        // })
        // console.log('userData', userData)
      })
    })
  }, [])
  console.log('posts', posts)
  return (
    <div className={classes.posts}>
      {/* {console.log('posts', posts)} */}
      {user &&
        <UploadPost setPosts={setPosts} />
      }
      {
        posts.map(({ id, username, avatar, postBannerColour, post }) => {
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