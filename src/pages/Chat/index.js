import React, { useState, useEffect } from 'react'
import { Paper, Grid, Typography, IconButton } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { Link, useLocation } from 'react-router-dom'
import UserCardMessage from '../../components/UserCardMessage'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { db } from '../../firebase'

import { useStyles } from './styles'

const Chat = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId }, userDispatch] = useUserValue()
  const location = useLocation()
  const [chatId, setChatId] = useState(null)
  const [chatList, setChatList] = useState([])
  const [chatName, setChatName] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (location.pathname === '/chat') {
      setChatId(null)
      db.collection("chats").where("uid", "array-contains", userId).onSnapshot(queryChatSnapshot => {
        const userIdList = []
        const userList = []
        const promises = []
        queryChatSnapshot.forEach(chat => {
          chat.data().uid.forEach(user => {
            if (user !== userId) {
              userIdList.push({ user, chatId: chat.id })
            }
          })
        })

        userIdList.forEach(async ({ user, chatId }) => {
          const queryUser = db.doc(`/users/${user}`).get()
          promises.push(queryUser)
          const getUser = await queryUser
          const userData = {
            username: getUser.data().username,
            avatar: getUser.data().avatar,
            uid: user,
            chatId,
          }
          userList.push(userData)
          Promise.all(promises).then(() => {
            setChatList(userList)
          })
        })
      })
    } else {
      const chatLocation = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
      setChatId(chatLocation)
      db.doc(`/chats/${chatLocation}`).onSnapshot(queryChatSnapshot => {
        queryChatSnapshot.data().uid.forEach(user => {
          if (user !== userId) {
            // setChatName(user)
            db.doc(`/users/${user}`).get().then(userSnapshot => {
              setChatName(userSnapshot.data().username)
            })
          }
        })
      })
    }
  }, [location.pathname])

  const renderUserCard = () => {
    return chatList.map((user, index) => {
      return (
        <Grid container item xs={12} style={{ marginTop: '10px' }} key={index}>
          <Grid item xs={2} />
          <Grid container item xs={8} style={{ justifyContent: 'center' }}>
            <UserCardMessage username={user.username} avatar={user.avatar} uid={user.uid} chatId={user.chatId} />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      )
    })
  }

  const renderPage = () => {
    return (chatId) ? (
      <div className={classes.container} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
        <Paper
          square
          variant='outlined'
          className={classes.paper}
          style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
        >
          <Grid container>
            <Grid container item xs={12} style={{ justifyContent: 'flex-start' }}>
              <Link to='/chat'>
                <IconButton>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs={1} />
            <Grid container item xs={10} style={{ justifyContent: 'center' }}>
              <Typography variant='h5' style={{ textAlign: 'center' }}>{chatName}</Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Paper>
      </div>
    ) : (
        <div className={classes.container} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
          <Paper
            square
            variant='outlined'
            className={classes.paper}
            style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa' }}
          >
            <Grid container style={{ justifyContent: 'center' }}>
              <Grid item xs={12} style={{ height: '30px' }} />
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Typography
                  variant='h4'
                  style={{ textAlign: 'center' }}
                >
                  Chats
              </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} style={{ height: '30px' }} />
              {renderUserCard()}
            </Grid>
          </Paper>
        </div>
      )
  }

  return (
    <>
      {renderPage()}
    </>
  )
}

export default Chat