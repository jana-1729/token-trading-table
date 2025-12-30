import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WebSocketState } from "@/types/token";

const initialState: WebSocketState = {
  connected: false,
  lastUpdate: null,
  error: null,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setLastUpdate: (state, action: PayloadAction<number>) => {
      state.lastUpdate = action.payload;
    },
    setWebSocketError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      if (action.payload) {
        state.connected = false;
      }
    },
  },
});

export const { setConnected, setLastUpdate, setWebSocketError } = websocketSlice.actions;

export default websocketSlice.reducer;

