import React, { createContext, useContext, useReducer } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ reducer, initialState, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
)

export const useUserValue = () => useContext(UserContext)
