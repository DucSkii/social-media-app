import React from 'react'
import './styles.scss'
import { Paper, Typography, Avatar, makeStyles } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from "react-slideshow-image";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '23px',
    height: '23px',
    marginRight: '5px',
    [theme.breakpoints.up('sm')]: {
      width: '26px',
      height: '26px',
      marginRight: '7px',
    },
  },
}))

const Post = (props) => {

  const classes = useStyles()

  const renderImage = () => {
    if (props.image) {
      if (Array.isArray(props.image)) {
        return (
          <Fade
            autoplay={false}
            transitionDuration={200}
          >
            {
              props.image.map((image, index) => {
                return (
                  <div key={index}>
                    <img src={image} alt='' className='post-image' />
                  </div>
                )
              })
            }
          </Fade>
        )
      } else {
        return <img src={props.image} alt='' className='post-image' />
      }
    } else {
      return null
    }
  }

  return (
    <div className='post'>
      <header className='post-header'>
        <Paper variant='outlined' square className='post-header-paper' style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
          <Avatar className={classes.avatar} />
          <Typography style={{ fontSize: '12px' }}><strong>{props.username}</strong></Typography>
        </Paper>
      </header>
      <div>
        {renderImage()}
      </div>
      <footer className='post-footer'>
        {props.image ? (
          <Typography style={{ fontSize: '12px' }}>
            <strong>{props.image ? props.username : ''}</strong> {props.image ? props.caption : <strong>{props.caption}</strong>}
          </Typography>
        ) : (
            <Typography style={{ fontSize: '14px' }}>
              <strong>{props.image ? props.username : ''}</strong> {props.image ? props.caption : <strong>{props.caption}</strong>}
            </Typography>
          )}
      </footer>
    </div>
  )
}

export default Post