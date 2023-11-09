import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import { Message } from "../../../models";
import {
  MessageData,
  messageService,
} from "../../services/message/messageService";

export const getAllMessages = createAsyncThunk(
  "messages/all",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await messageService.getAllMessages(chatId);
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

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (data: MessageData, { rejectWithValue }) => {
    try {
      const response = await messageService.sendMessage(data);
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

interface MessageState {
  messages: Message[] | [];
  loading: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
};

const allMessagesSlice = createSlice({
  name: "messages/all",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    appendMessage: (state, action) => {
      const message = action.payload;
      state.messages = [...state.messages, message];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllMessages.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllMessages.fulfilled.type,
      (state, action) => {
        const messages = action.payload.data;
        state.loading = false;
        state.messages = messages;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllMessages.rejected.type,
      (state) => {
        state.loading = false;
        state.messages = [];
      }
    );

    builder.addMatcher(
      (action) => action.type === sendMessage.fulfilled.type,
      (state, action) => {
        const message = action.payload.data;
        state.loading = false;
        state.messages = [...state.messages, message];
      }
    );
  },
});

export const { clearMessages, appendMessage } = allMessagesSlice.actions;
export const allMessagesReducer = allMessagesSlice.reducer;