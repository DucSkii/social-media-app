import React from 'react'
import './styles.scss'
import { Paper, Typography, Avatar, makeStyles } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import classNames from 'classnames'
import { Fade } from "react-slideshow-image";

const useStyles = makeStyles(theme => ({
  header: {
    borderRadius: '0',
    [theme.breakpoints.up('sm')]: {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
  },
  avatar: {
    width: '23px',
    height: '23px',
    marginRight: '8px',
    [theme.breakpoints.up('sm')]: {
      width: '26px',
      height: '26px',
      marginRight: '10px',
    },
  },
}))

const Post = (props) => {

  const classes = useStyles()
  const postHeader = classNames('post-header-paper', classes.header)

  const renderImage = () => {
    if (props.image) {
      if (props.image.length !== 1) {
        return (
          <Fade
            autoplay={false}
            transitionDuration={200}
          >
            {
              props.image.map((image, index) => {
                return (
                  <div key={index} style={{ width: '100%' }}>
                    <img src={image} alt='' className='post-image' />
                  </div>
                )
              })
            }
          </Fade>
        )
      } else {
        return props.image.map((image, index) => {
          return <img key={index} src={image} alt='' className='post-image' />
        })
      }
    } else {
      return null
    }
  }

  return (
    <div className='post' style={{ border: 'none' }}>
      <header className='post-header'>
        <Paper variant='outlined' square className={postHeader}>
          <Avatar src={props.avatar} className={classes.avatar} />
          <Typography style={{ fontSize: '12px' }}><strong>{props.username}</strong></Typography>
        </Paper>
      </header>
      {
        props.image[0] !== '' &&
        <div>
          {renderImage()}
        </div>
      }
      <Paper square >
        <footer className='post-footer'>
          {props.image[0] !== '' ? (
            <Typography style={{ fontSize: '12px' }}>
              <strong>{props.username}</strong> {props.caption}
            </Typography>
          ) : (
              <Typography style={{ fontSize: '14px' }}>
                <strong>{props.caption}</strong>
              </Typography>
            )}
        </footer>
      </Paper>
    </div>
  )
}

export default Post