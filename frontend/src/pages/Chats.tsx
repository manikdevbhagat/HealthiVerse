import React, { useEffect, useState, useRef } from "react";
import ChatBox from "../components/Chats/ChatBox";
import MyChats from "../components/Chats/MyChats";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { clearCurrentChat } from "../features/slices/chat/currentChatSlice";
import { setChatWindow } from "../features/slices/chat/chatWindowSlice";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const { token } = useAppSelector((state) => state.login);
  const { window } = useAppSelector((state) => state.chatWindow);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setChatWindow("chats"));
      dispatch(clearCurrentChat());
    };
  }, [dispatch]);

  return (
    <div className="flex gap-5 h-[90vh] min-h-[600px] p-4 lg:p-10">
      <div
        className={`${
          window === "chats" ? "block w-full" : "hidden"
        } lg:block lg:w-1/3 min-w-[300px] h-full`}
      >
        <MyChats />
      </div>
      <div
        className={`${
          window === "messages" ? "block w-full" : "hidden"
        } lg:block lg:w-2/3 h-full`}
      >
        <ChatBox />
      </div>
    </div>
  );
};

export default Chats;