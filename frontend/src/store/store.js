// store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import projectReducer from './slices/projectSlice'
import taskReducer from './slices/taskSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'project', 'task']
}

// Combine reducers first
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
})

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      },
    })
})

export const persistor = persistStore(store)
