import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';

const middleWares =[process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const persistConfig = {
  key: 'persist',
  storage,
}

// checking if server or client, and creating persisted Reducer on client, and root reducer on server
export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleWares),
  })
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store = configureStore({
      reducer: persistedReducer,
    })
    store.__persistor = persistStore(store)
    return store
  }};


  
/* old approach
export const makeStore = () => {
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleWares),
  });
};
*/