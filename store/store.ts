import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./slices/tokensSlice";
import filtersReducer from "./slices/filtersSlice";
import websocketReducer from "./slices/websocketSlice";

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    filters: filtersReducer,
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["websocket/connect", "websocket/disconnect"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

