import { configureStore,createSlice,PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'

import month1 from './data';

const rootReducer = combineReducers({
    month1 : month1,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['month1']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })


export default store;