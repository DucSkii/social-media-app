import React from 'react'
import { Paper, Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import './styles.scss'


const Header = () => {

  return (
    <div className="header">
      <Paper className="header" variant='outlined' square>
        <h3 className='header-logo'>Logo</h3>
        <div className='header-icons'>
          <IconButton size='small'>
            <Avatar />
          </IconButton>
          <IconButton size='medium'>
            <MenuIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  )
}

export default Header