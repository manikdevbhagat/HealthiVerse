import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "../../services/chat/chatService";
import { AxiosError } from "axios";
import { Chat } from "../../../models";

export const createChat = createAsyncThunk(
  "chats/current",
  async (data: { id: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await chatService.createChat(data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response && error.response.data && error.response.data.message;
        return rejectWithValue(message);
      }
      console.log(error);
    }
  }
);

interface ChatState {
  currentChat: Chat | null;
  loading: boolean;
}

const initialState: ChatState = {
  currentChat: null,
  loading: false,
};

const currentChatSlice = createSlice({
  name: "chat/current",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearCurrentChat:(state)=>{
      state.currentChat = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === createChat.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === createChat.fulfilled.type,
      (state, action) => {
        const chat = action.payload.chat;
        state.loading = false;
        state.currentChat = chat;
      }
    );

    builder.addMatcher(
      (action) => action.type === createChat.rejected.type,
      (state) => {
        state.loading = false;
        state.currentChat = null;
      }
    );
  },
});

export const { setCurrentChat, clearCurrentChat } = currentChatSlice.actions;
export const currentChatReducer = currentChatSlice.reducer;