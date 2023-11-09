import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "../../services/chat/chatService";
import { AxiosError } from "axios";
import { Chat } from "../../../models";

export const getAllChats = createAsyncThunk(
  "chats/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getAllChats();
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
  chats: Chat[] | [];
  loading: boolean;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
};

const allChatsSlice = createSlice({
  name: "chats/all",
  initialState,
  reducers: {
    updateLatestMessage: (state, action)=>{
      const {chatId, latestMessage} = action.payload;
      let index;
      for(let i=0; i<state.chats.length;i++){
        if(state.chats[i]._id===chatId){
          index = i;
        }
      }
      if(index && index!==-1){
        const chat = state.chats.splice(index,1);
        state.chats = [chat[0], ...state.chats];
      }
      state.chats[0].latestMessage = latestMessage;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllChats.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllChats.fulfilled.type,
      (state, action) => {
        const chats = action.payload.chats;
        state.loading = false;
        state.chats = chats;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllChats.rejected.type,
      (state) => {
        state.loading = false;
        state.chats = [];
      }
    );
  },
});

export const {updateLatestMessage} = allChatsSlice.actions;
export const allChatsReducer = allChatsSlice.reducer;