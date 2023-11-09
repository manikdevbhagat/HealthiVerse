import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { getAllChats } from "../../features/slices/chat/allChatsSlice";
import { HashLoader } from "react-spinners";

const UserChats = () => {
  const dispatch = useAppDispatch();
  const { chats, loading } = useAppSelector((state) => state.allChats);
  const fetchData = () => {
    dispatch(getAllChats()).unwrap().then(console.log).catch(console.log);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      {loading ? (
        <HashLoader />
      ) : (
        chats.map((chat) => <div>{chat.chatName}</div>)
      )}
    </div>
  );
};

export default UserChats;