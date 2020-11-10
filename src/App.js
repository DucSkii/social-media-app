import React from 'react'
import Header from './components/Header'
import Post from './components/Post'
import './App.scss'

const App = () => {

  return (
    <div className='App'>
      <header>
        <Header />
      </header>
      <body>
        <Post />
      </body>
    </div>
  )
}

export default App;
