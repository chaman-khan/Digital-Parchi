import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import PinSlice from '../Features/PinSlice';
import ParchiSlice from '../Features/ParchiSlice';
import NawanSlice from '../Features/NawanSlice';

const rootReducer = combineReducers({
  pin: PinSlice,
  app: ParchiSlice,
  NawanSlice: NawanSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pin', 'NawanSlice', 'app'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = () => {
  const middlewares = [];
  middlewares.push(thunk);

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  return middlewares;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const persistor = persistStore(store);

export {store, persistor};
