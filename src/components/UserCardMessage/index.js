import React, { useState } from 'react'
import { useStyles } from './styles'
import { Paper, Avatar, Typography, IconButton, Grid } from '@material-ui/core'
import { useUserValue } from '../../context/UserContext'
import { useGeneralValue } from '../../context/GeneralContext'
import { Link } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/Chat'

const UserCard = (props) => {

  const classes = useStyles()
  const [{ userId }, userDispatch] = useUserValue()
  const [{ darkMode }, dispatch] = useGeneralValue()

  return (
    <>
      <Paper variant='outlined' style={{ width: '100%' }}>
        <Grid container style={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={2} md={1} >
            <Link to={`/profile/${props.uid}`} className={classes.link}>
              <Avatar src={props.avatar} className={classes.avatar} />
            </Link>
          </Grid>
          <Grid item xs={5} md={6}>
            <Link to={`/profile/${props.uid}`} className={classes.link} style={{ color: darkMode ? '#fff' : '#000000' }}>
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
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default UserCard