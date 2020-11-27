import React, { useState } from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, IconButton, Grid } from '@material-ui/core'
import { useUserValue } from '../../context/UserContext'
import { useGeneralValue } from '../../context/GeneralContext'
import { Link } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/Chat'
import CancelIcon from '@material-ui/icons/Cancel'
import { db } from '../../firebase'

const UserCardMessage = (props) => {
  const classes = useStyles()
  const [{ userId }, userDispatch] = useUserValue()
  const [{ darkMode }, dispatch] = useGeneralValue()

  const closeChat = async () => {
    const queryChat = db.doc(`/chats/${props.chatId}`).get()
    const getChat = await queryChat
    if (getChat.data().hide === undefined) {
      db.doc(`/chats/${props.chatId}`).update({
        hide: [userId],
      })
    } else {
      db.doc(`/chats/${props.chatId}`).update({
        hide: [userId, props.uid]
      })
    }
  }
  console.log('props.username', props.username)
  return (
    <>
      <Paper variant='outlined' style={{ width: '100%' }}>
        <Grid container style={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={2} md={1} >
            <Link to={`/profile/${props.username}/${props.username}/${props.uid}`} className={classes.link}>
              <Avatar src={props.avatar} className={classes.avatar} />
            </Link>
          </Grid>
          <Grid item xs={5} md={6}>
            <Link to={`/profile/${props.username}/${props.uid}`} className={classes.link} style={{ color: darkMode ? '#fff' : '#000000' }}>
              <Typography style={{ whiteSpace: 'no-wrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {props.username}
              </Typography>
            </Link>
          </Grid>
          <Grid container item xs={5} style={{ justifyContent: 'flex-end' }}>
            <Link to={`/chat/${props.chatId}`}>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </Link>
            <IconButton className={classes.closeButton} onClick={closeChat}>
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default UserCardMessage