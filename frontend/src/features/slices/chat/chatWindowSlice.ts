import { createSlice } from "@reduxjs/toolkit"

const initialState: {window: "chats"|"messages"} = {
  window: "chats"
}

const chatWindowSlice = createSlice({
  name: "chatWindow",
  initialState,
  reducers: {
    setChatWindow: (state, action)=>{
      state.window = action.payload;
    }
  }
})

export const {setChatWindow} = chatWindowSlice.actions;
export const chatWindowReducer = chatWindowSlice.reducer;