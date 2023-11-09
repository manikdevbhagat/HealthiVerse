// socketSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  disconnectSocket,
  initializeSocket,
} from "../../services/socket/socketService";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

export const initializeSocketAsync = createAsyncThunk(
  "socket/initializeSocket",
  async () => {
    const socket = initializeSocket();
    return socket; // Return the socket directly
  }
);

export const disconnectSocketAsync = createAsyncThunk(
  "socket/disconnectSocket",
  async (socket: Socket) => {
    if (socket) {
      disconnectSocket(socket);
    }
  }
);

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === initializeSocketAsync.fulfilled.type,
      (state, action) => {
        state.socket = action.payload;
      }
    );
    builder.addMatcher(
      (action) => action.type === disconnectSocketAsync.fulfilled.type,
      (state) => {
        state.socket = null;
      }
    );
  },
});

const socketReducer = socketSlice.reducer;
export default socketReducer;