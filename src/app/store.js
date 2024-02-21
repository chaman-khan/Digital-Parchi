import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import PinSlice from '../Features/PinSlice';
import ParchiSlice from '../Features/ParchiSlice';

// Combine reducers
const rootReducer = combineReducers({
  pin: PinSlice,
  app: ParchiSlice,
  // Add other reducers if any
});

// Redux-persist configuration
const persistConfig = {
  key: 'root', // Key for persisting the state
  storage: AsyncStorage, // Storage engine
  whitelist: ['pin'],
  blacklist: ['app'],
};

// Wrap root reducer with persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create middleware
const logger = createLogger();
const middleware = [];

middleware.push(logger, thunk);

// Create Redux store with middleware and persisted reducer
const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Create and export persist store
const persistor = persistStore(store);

export {store, persistor};
