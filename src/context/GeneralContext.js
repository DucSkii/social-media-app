import React, { createContext, useContext, useReducer } from 'react'

export const GeneralContext = createContext()

export const GeneralContextProvider = ({ reducer, initialState, children }) => (
  <GeneralContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GeneralContext.Provider>
)

export const useGeneralValue = () => useContext(GeneralContext)
