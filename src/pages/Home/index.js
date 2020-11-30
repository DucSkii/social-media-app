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
  const [maxPosts, setMaxPosts] = useState(3)
  const [postsLength, setPostsLength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPostsLength(snapshot.docs.length)
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop >= e.target.clientHeight - 100
    if (bottom) {
      fetchMoreData()
    }
  }

  const fetchMoreData = () => {
    if (maxPosts >= postsLength) {
      return setIsLoading(false)
    }
    setIsLoading(true)
    setTimeout(() => {
      setMaxPosts(prevState => prevState + 3)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className={classes.posts} onScroll={e => handleScroll(e)}>
      {user &&
        <UploadPost />
      }
      {
        posts.slice(0, maxPosts).map(({ id, post }) => {
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
      {isLoading === true &&
        <div style={{ marginBottom: '10px' }}>Loading...</div>
      }
    </div>
  )
}

export default Home