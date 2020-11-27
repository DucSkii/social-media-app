import React, { useState, useEffect, useRef } from 'react'
import { Paper, Grid, Typography, IconButton, Avatar, Input } from '@material-ui/core'
import { useGeneralValue } from '../../context/GeneralContext'
import { useUserValue } from '../../context/UserContext'
import { Link, useLocation } from 'react-router-dom'
import UserCardMessage from '../../components/UserCardMessage'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import SendIcon from '@material-ui/icons/Send'
import { db } from '../../firebase'
import firebase from 'firebase'

import { useStyles } from './styles'

const Chat = () => {

  const classes = useStyles()
  const [{ darkMode }, dispatch] = useGeneralValue()
  const [{ userId, userImage }, userDispatch] = useUserValue()
  const location = useLocation()
  const [chatId, setChatId] = useState(null)
  const [chatList, setChatList] = useState([])
  const [chatName, setChatName] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const bottomPage = useRef()

  useEffect(() => {
    if (location.pathname === '/chat') {
      setChatId(null)
      const unsubscribeChat = db.collection("chats").where("uid", "array-contains", userId).onSnapshot(queryChatSnapshot => {
        const userIdList = []
        const userList = []
        const promises = []
        queryChatSnapshot.forEach(chat => {
          if (chat.data().hide === undefined) {
            chat.data().uid.forEach(user => {
              if (user !== userId) {
                userIdList.push({ user, chatId: chat.id })
              }
            })
          } else if (!chat.data().hide.includes(userId)) {
            chat.data().uid.forEach(user => {
              if (user !== userId) {
                userIdList.push({ user, chatId: chat.id })
              }
            })
          } else {
            return null
          }
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

      return () => {
        unsubscribeChat()
      }
    } else {
      const chatLocation = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
      setChatId(chatLocation)
      const unsubscribe = db.doc(`/chats/${chatLocation}`).onSnapshot(queryChatSnapshot => {
        queryChatSnapshot.data().uid.forEach(user => {
          if (user !== userId) {
            db.doc(`/users/${user}`).get().then(userSnapshot => {
              setChatName(userSnapshot.data().username)
            })
          }
        })
      })

      const unsubscribeMessage = db.doc(`/chats/${chatLocation}`)
        .collection("messages")
        .orderBy('timestamp')
        .onSnapshot(doc => {
          const userMessage = []
          if (doc.docs.length) {
            doc.forEach(message => {
              userMessage.push(message.data())
            })
            setMessages(userMessage)
            bottomPage.current.scrollIntoView({ behavior: 'smooth' })
          } else {
            setMessages([])
          }
        })

      return () => {
        unsubscribe()
        unsubscribeMessage()
      }
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

  const renderMessages = () => {
    return messages.map((message, index) => {

      const messageSender = (message.uid === userId) ? 'row' : 'row-reverse'

      return (
        <Grid container item xs={12} key={index}>
          <Grid container item xs={12}>
            <Grid item xs={1} md={2} />
            <Grid container item xs={10} md={8}
              style={{ alignItems: 'center', flexDirection: messageSender }}
            >
              <Avatar src={message.avatar} style={{ margin: '0px 10px' }} />
              <Typography variant='h6'>{message.text}</Typography>
            </Grid>
            <Grid item xs={1} md={2} />
          </Grid>
          <Grid item xs={12} style={{ height: '10px' }} />
        </Grid>
      )
    })
  }

  const sendMessage = async (e) => {
    e.preventDefault()

    db.doc(`/chats/${chatId}`).collection("messages").add({
      text: message,
      avatar: userImage,
      uid: userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const queryChat = db.doc(`/chats/${chatId}`).get()
    const getChat = await queryChat
    if (getChat.data() === undefined) {
      return null
    } else {
      db.doc(`/chats/${chatId}`).update({
        hide: firebase.firestore.FieldValue.delete(),
      })
    }

    setMessage('')
  }

  const renderPage = () => {
    return (chatId) ? (
      <>
        <div className={classes.container} style={{ backgroundColor: darkMode ? '#4F4F4F' : '#F5F5F5' }}>
          <Paper
            square
            variant='outlined'
            className={classes.paper}
            style={{ border: 'none', backgroundColor: darkMode ? '#666' : '#fafafa', height: 'fit-content' }}
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
                <Typography
                  variant='h4'
                  style={{ fontSize: '33px', textAlign: 'center' }}
                >
                  {chatName}
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} style={{ height: '30px' }} />
              {renderMessages()}
              <div ref={bottomPage} />
              <Grid item xs={12} style={{ height: '10px' }} />
            </Grid>
          </Paper>
          <Paper square variant='outlined' className={classes.textBox} style={{ position: 'fixed', bottom: '0' }}>
            <form
              onSubmit={sendMessage}
              style={{ display: 'flex', alignItems: 'center', padding: ' 5px 20px' }}
            >
              <Input
                required
                placeholder='Send Message...'
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ width: '100%' }}
              />
              <IconButton type='submit'>
                <SendIcon />
              </IconButton>
            </form>
          </Paper>
        </div>
      </>
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