'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../store.jsx'
import { PersistGate } from 'redux-persist/integration/react'


export  const StoreProvider = ({ children }) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider;