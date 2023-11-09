import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../../models";



const initialState: { notifications: Notification[] } = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNewNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    clearNotification: (state, action) => {
      const notification = action.payload;
      const index = state.notifications.indexOf(notification);
      state.notifications.splice(index, 1);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNewNotification, clearNotification, clearAllNotifications } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;