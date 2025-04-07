import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { postDataSlice } from "./slice/postData/postDataSlice";
import themeSlice from "./slice/themeSlice";
import authReducer from "./slice/authSlice";
import { loginSlice } from "./slice/loginSlice";
import { chatApi } from "./slice/chatApi/chatApi";
import { imageApi } from './slice/imageAPi/imageApi';

// Combine the reducers
const rootReducer = combineReducers({
  [postDataSlice.reducerPath]: postDataSlice.reducer,
  [loginSlice.reducerPath]: loginSlice.reducer,
  theme: themeSlice,
  auth: authReducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postDataSlice.middleware,
      loginSlice.middleware,
      chatApi.middleware,
      imageApi.middleware,
    ),
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store as the default export
export default store;

// Optionally, define a type for Thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
