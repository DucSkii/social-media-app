import React from 'react'
import './styles.scss'
import { Paper, Typography, Avatar } from '@material-ui/core'

const Post = () => {

  return (
    <div className='post'>
      <header className='post-header'>
        <Paper variant='outlined' square className='post-header-paper' style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
          <Avatar className='post-header-avatar' />
          <Typography variant='h7'>Username</Typography>
        </Paper>
      </header>
      <body>
        <img className='post-image' src='https://i.pinimg.com/originals/a2/20/98/a220980c4dab3ea9ca2af8d2d1b1a41c.jpg' alt='' />
      </body>
    </div>
  )
}

export default Post