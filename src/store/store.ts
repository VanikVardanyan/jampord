import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "./profile/api";
import { tourApi } from "./tour/api";
import { tourRequestApi } from "./tour-request/api";

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
    [tourRequestApi.reducerPath]: tourRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware).concat(tourApi.middleware).concat(tourRequestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
