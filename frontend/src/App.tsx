import { useEffect } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { useAppDispatch, useAppSelector } from "./hooks/reduxhooks";
import {
  disconnectSocketAsync,
  initializeSocketAsync,
} from "./features/slices/socket/socketSlice";
import { appendMessage } from "./features/slices/message/messageSlice";
import { addNewNotification } from "./features/slices/notification/notificationSlice";

function App() {
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state.socket);
  const { currentChat } = useAppSelector((state) => state.currentChat);
  const { notifications } = useAppSelector((state) => state.notifications);
  const { user } = useAppSelector((state) => state.login);

  useEffect(() => {
    // Initialize the socket connection when the app loads
    if (user) {
      dispatch(initializeSocketAsync());
    }

    // Clean up the socket when the app unmounts
    return () => {
      if (socket) dispatch(disconnectSocketAsync(socket));
    };
  }, [user]);

  useEffect(() => {
    if (user && socket) {
      socket.emit("setup", user._id);
    }
  }, [user, socket]);

  useEffect(() => {
    socket?.on("message received", (newMessage) => {
      console.log(currentChat, newMessage);
      if (!currentChat || currentChat._id !== newMessage.chat._id) {
        //send notification
        if (!notifications.includes(newMessage)) {
          // console.log("adding notification");
          dispatch(addNewNotification(newMessage));
        }
      } else {
        // console.log(newMessage);
        dispatch(appendMessage(newMessage));
      }
    });

    return () => {
      socket?.off("message received");
    };
  }, [socket, currentChat]);

  return <Layout />;
}

export default App;