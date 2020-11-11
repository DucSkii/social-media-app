import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { UserContextProvider } from './context/UserContext'
import { GeneralContextProvider } from './context/GeneralContext'
import userReducer, { initialUserState } from './reducer/userReducer'
import generalReducer, { initialState } from './reducer/generalReducer'

ReactDOM.render(
  <GeneralContextProvider reducer={generalReducer} initialState={initialState}>
    <UserContextProvider reducer={userReducer} initialState={initialUserState}>
        <App />
    </UserContextProvider>
  </GeneralContextProvider>
  , document.getElementById('root')
)