import { configureStore } from '@reduxjs/toolkit';
import { postDataSlice } from './slice/postDataSlice';
import themeSlice from './slice/themeSlice';

export const store = configureStore({
  reducer: {
    [postDataSlice.reducerPath]: postDataSlice.reducer,
    theme: themeSlice,
    

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postDataSlice.middleware),
});

// Export the store for use in other parts of the application

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;