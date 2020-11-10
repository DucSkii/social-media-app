import React from 'react'
import './styles.scss'
import { Paper, Typography, Avatar } from '@material-ui/core'

const Post = (props) => {

  return (
    <div className='post'>
      <header className='post-header'>
        <Paper variant='outlined' square className='post-header-paper' style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
          <Avatar className='post-header-avatar' style={{ width: '25px', height: '25px' }} />
          <Typography style={{ fontSize: '13px' }}>{props.username}</Typography>
        </Paper>
      </header>
      {props.image &&
        <div>
          <img className='post-image' src={props.image} alt='' />
        </div>
      }
      <footer className='post-footer'>
        <Typography style={{ fontSize: '13px' }}>
          <strong>{props.image ? props.username : ''}</strong> {props.image ? props.caption : <strong>{props.caption}</strong>}
        </Typography>
      </footer>
    </div>
  )
}

export default Post