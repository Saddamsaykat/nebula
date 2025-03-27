import { configureStore } from "@reduxjs/toolkit";
import { postDataSlice } from "./slice/postDataSlice";
import themeSlice from "./slice/themeSlice";
import authReducer from "./slice/authSlice";
import { loginSlice } from "./slice/loginSlice";
import { chatApi } from "./slice/chatApi/chatApi";

export const store = configureStore({
  reducer: {
    [postDataSlice.reducerPath]: postDataSlice.reducer,
    [loginSlice.reducerPath]: loginSlice.reducer,
    theme: themeSlice,
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postDataSlice.middleware,
      loginSlice.middleware,
      chatApi.middleware,
    ),
});

// ✅ Corrected Type Definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
