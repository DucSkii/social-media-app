import React from 'react'
import { Paper, Typography, Avatar, makeStyles } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import classNames from 'classnames'
import { Fade } from "react-slideshow-image"
import { Link } from 'react-router-dom'
import { useGeneralValue } from '../../context/GeneralContext'

import './styles.scss'

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
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
}))

const Post = (props) => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const postHeader = classNames('post-header-paper', classes.header)

  const renderImage = () => {
    if (Array.isArray(props.image)) {
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
      return <img src={props.image} alt='' className='post-image' />
    }
  }

  return (
    <div className='post' style={{ border: 'none' }}>
      <header className='post-header'>
        <Paper variant='outlined' square className={postHeader}>
          <Link to={`/profile/${props.username}/${props.uid}`}
            className={classes.link}
            style={{ color: darkMode ? '#fff' : '#000000' }}
          >
            <Avatar src={props.avatar} className={classes.avatar} />
            <Typography style={{ fontSize: '12px' }}><strong>{props.username}</strong></Typography>
          </Link>
        </Paper>
      </header>
      {
        props.image !== '' &&
        <>
          {renderImage()}
        </>
      }
      <Paper square >
        <footer className='post-footer'>
          {props.image !== '' ? (
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