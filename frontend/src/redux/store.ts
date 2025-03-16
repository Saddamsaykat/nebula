import { configureStore } from "@reduxjs/toolkit";
import { postDataSlice } from "./slice/postDataSlice";
import themeSlice from "./slice/themeSlice";
import authReducer from "./slice/authSlice";
import { loginSlice } from "./slice/loginSlice";

export const store = configureStore({
  reducer: {
    [postDataSlice.reducerPath]: postDataSlice.reducer,
    [loginSlice.reducerPath]: loginSlice.reducer,
    theme: themeSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postDataSlice.middleware,
      loginSlice.middleware // Add your other middlewares here
    ),
});

// ✅ Corrected Type Definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
