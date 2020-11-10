import React from 'react'
import './styles.scss'
import { Paper, Typography, Avatar } from '@material-ui/core'

const Post = (props) => {

  return (
    <div className='post'>
      <header className='post-header'>
        <Paper variant='outlined' square className='post-header-paper' style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
          <Avatar className='post-header-avatar' />
          <Typography variant='h'>{props.username}</Typography>
        </Paper>
      </header>
      {props.image &&
        <body>
          <img className='post-image' src={props.image} alt='' />
        </body>
      }
      <footer className='post-footer'>
        <Typography>
          <strong>{props.image ? props.username : ''}</strong> {props.image ? props.caption : <strong>{props.caption}</strong>}
        </Typography>
      </footer>
    </div>
  )
}

export default Post