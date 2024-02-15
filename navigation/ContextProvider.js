import { createContext, useState } from 'react';

import React from 'react'


export const myContext = createContext(null);


const ContextProvider = ({children}) => {
const [photoContext, setPhotoContext] = useState({})

const contextValue = {photoContext, setPhotoContext}

  return (
    <myContext.Provider value={contextValue}>
      {children}
    </myContext.Provider>
  )
}

export default ContextProvider

