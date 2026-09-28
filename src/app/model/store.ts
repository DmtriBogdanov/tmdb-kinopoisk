import {configureStore} from "@reduxjs/toolkit";
import {themeSlice} from "@/features/themeSlice";
import {tmdbApi} from "@/app/api/tmdbApi";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tmdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch