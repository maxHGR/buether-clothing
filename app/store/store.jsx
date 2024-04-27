import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares =[process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);




export const makeStore = () => {
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleWares),
  });
};
