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

  // useEffect(() => {
  //   setPosts([])
  //   db.collection("posts").orderBy('timestamp', 'desc').get().then(queryPostSnapshot => {
  //     let postsData = []

  //     let i = 0

  //     queryPostSnapshot.forEach(post => {
  //       postsData[i] = {
  //         post: post.data(),
  //         id: post.id,
  //         user: {}
  //       }

  //       db.collection("users").doc(post.data().uid).get().then(doc => {
  //         for (let j in postsData) {
  //           if (postsData[j].id === post.id) {
  //             postsData[j].user = {
  //               username: doc.data().username,
  //               avatar: doc.data().avatar,
  //               postBannerColour: doc.data().postBannerColour,
  //             }
  //             break
  //           }
  //         }

  //       })

  //       i++
  //     })
  //     setPosts(postsData)
  //   })
  // }, [])

  // console.log('posts', posts)

  // db.collection("posts").orderBy('timestamp', 'desc').get().then(queryPostSnapshot => {
  //   return queryPostSnapshot.docs.map(doc => {
  //     return doc.data()
  //   })
  // }).then(doc => {
  //   console.log('doc', doc)
  //   doc.forEach(post => {
  //     // console.log('post', post)
  //     db.collection("users").doc(post.uid).get().then(user => {
  //       const userData = {
  //         username: user.data().username,
  //         avatar: user.data().avatar,
  //         postBannerColour: user.data().postBannerColour,
  //         uid: user.data().uid,
  //       }
  //       Object.assign(post, userData)
  //     })
  //   })
  //   return doc
  // })

  // docs.map(post => {
  //   console.log('post', post.data())
  //   const postData = post.data()
  //   db.collection("users").doc(post.data().uid).get().then(user => {
  //     const userData = {
  //       username: user.data().username,
  //       avatar: user.data().avatar,
  //       postBannerColour: user.data().postBannerColour,
  //     } 
  //     setPosts(prevState => [...prevState, {postData, userData}])
  //   })
  // })

  // const postData = {
  //   post: post.data(),
  //   id: post.id,
  // }
  // db.collection("users").doc(post.data().uid).get().then(doc => {
  //   const userData = {
  //     username: doc.data().username,
  //     avatar: doc.data().avatar,
  //     postBannerColour: doc.data().postBannerColour,
  //   }
  //   Object.assign(postData, userData)
  // })
  // setPosts(prevState => [...prevState, postData])

  return (
    <div className={classes.posts}>
      {user &&
        <UploadPost setPosts={setPosts} />
      }
      {
        posts.map(({ id, post, username, avatar, postBannerColour }) => {
          // console.log('post', post)
          return <Post
            key={id}
            postId={id}
            likes={post.likes}
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            username={username}
            avatar={avatar}
            postBannerColour={postBannerColour}
          />
        })
        // // // having a unique key for each post prevents old posts from having to re-render when a new post is added
      }
    </div>
  )
}

export default Home