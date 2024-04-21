import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

export const makeStore = () => {
  return configureStore({
      reducer: rootReducer,
  });
};
