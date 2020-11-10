import React from 'react'
import { Paper, Avatar, IconButton, Button, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import './styles.scss'

const useStyles = makeStyles(theme => ({
  buttonSignUp: {
    marginLeft: '5px',
    marginRight: '5px',
    height: '25px',
    fontSize: '12px',
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '10px',
      marginRight: '10px',
      height: '30px',
      fontSize: '15px',
      padding: '5px',
    },
  },
  buttonLogin: {
    height: '25px',
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      height: '30px',
      fontSize: '15px',
      padding: '5px',
    },
  },
}))

const Header = () => {

  const classes = useStyles()

  return (
    <div className="header">
      <Paper className="header" variant='outlined' square>
        <h3 className='header-logo'>Logo</h3>
        <div className='header-login'>
          <Button color='primary' className={classes.buttonLogin}>Login</Button>
          <Button variant='outlined' color='secondary' className={classes.buttonSignUp}>Sign-up</Button>
        </div>
        {/* <div className='header-icons'>
          <IconButton size='small'>
            <Avatar />
          </IconButton>
          <IconButton size='medium'>
            <MenuIcon />
          </IconButton>
        </div> */}
      </Paper>
    </div>
  )
}

export default Header