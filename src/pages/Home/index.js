import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Post from '../../components/Post'
import { db } from '../../firebase'
import { useStyles } from './styles'
import './styles.scss'


const Home = () => {

  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const postClass = classNames(classes.posts, 'posts')

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data(),
        })
      ))
      // from the snapshot look through docs and map
    })
    // onSnapshot is a powerful listener, if posts gets changed or updated the function will update
  }, [])

  return (
    <div className={postClass}>
      {
        posts.map(({ id, post }) => {
          // having a unique key for each post prevents old posts from having to re-render when a new post is added
          return <Post key={id} username={post.username} caption={post.caption} image={post.image} />
        })
      }
    </div>
  )
}

export default Home