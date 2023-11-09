import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import {
  getAllMessages,
  sendMessage,
} from "../../features/slices/message/messageSlice";
import { MessageData } from "../../features/services/message/messageService";
import { toast } from "react-toastify";
import { getChatData } from "../../utils/getChatData";
import { ClipLoader } from "react-spinners";
import { isUserSender } from "../../utils/isUserSender";
import { setChatWindow } from "../../features/slices/chat/chatWindowSlice";
import {IoArrowBackSharp} from "react-icons/io5"
import {
  updateLatestMessage,
} from "../../features/slices/chat/allChatsSlice";


const ChatBox = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login);
  const { currentChat } = useAppSelector((state) => state.currentChat);
  const { messages, loading } = useAppSelector((state) => state.allMessages);
  const [input, setInput] = useState<string>("");
  const scrollableListRef = useRef<HTMLDivElement | null>(null);
  const {socket} = useAppSelector(state=>state.socket);


  const fetchMessages = () => {
    if (currentChat) {
      dispatch(getAllMessages(currentChat._id)).unwrap();
      socket?.emit("join chat", currentChat._id);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);



  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentChat && currentChat._id) {
      const data: MessageData = {
        chatId: currentChat._id,
        content: input,
      };
      dispatch(sendMessage(data))
        .unwrap()
        .then((res) => {
          socket?.emit("new message", {
            ...data,
            chat: currentChat,
            sender: { senderData: user },
            createdAt: new Date()
          });
          setInput("");
          dispatch(
            updateLatestMessage({
              chatId: currentChat._id,
              latestMessage: { content: input, createdAt: new Date() },
            })
          );
        })
        .catch((err) => toast.error(err));
    }
  };

  // Scroll to the last message
  useEffect(() => {
    if (scrollableListRef.current) {
      scrollableListRef.current.scrollTop =
        scrollableListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {!currentChat ? (
        <div className="flex justify-center items-center h-full bg-gray-100 rounded-xl">
          <h2 className="text-gray-600 text-3xl">
            Click on a user to start chatting
          </h2>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full bg-gray-100 rounded-xl">
          <div className="px-6 py-2 bg-gray-600 rounded-t-xl">
            {currentChat ? (
              <div className="flex items-center gap-5">
                <button
                  onClick={() => dispatch(setChatWindow("chats"))}
                  className="block text-white  lg:hidden"
                >
                  <IoArrowBackSharp className="h-6 w-6"/>
                </button>
                <img
                  className="rounded-full h-[50px] w-[55px]"
                  src={user ? getChatData(user._id, currentChat).photo : ""}
                  alt=""
                />
                <h2 className="text-white text-2xl font-semibold">
                  {user && currentChat
                    ? getChatData(user._id, currentChat).name
                    : ""}
                </h2>
              </div>
            ) : (
              <div className="text-white font-bold px-6 py-2 text-3xl bg-gray-600 rounded-t-xl">
                Messages
              </div>
            )}
          </div>

          <div
            ref={scrollableListRef}
            className="h-full relative overflow-auto"
          >
            {loading && (
              <div className="absolute top-1/2 left-1/2">
                <ClipLoader size={35} />
              </div>
            )}
            {messages.length > 0 &&
              !loading &&
              user &&
              messages.map((message) => (
                <div
                  className={`${
                    isUserSender(user._id, message)
                      ? "bg-blue-300 ml-auto mr-4"
                      : "bg-white mx-auto ml-4"
                  } relative mt-4 w-52 lg:w-64 px-4 py-2 rounded-xl`}
                >
                  {message.content}
                  <span className="absolute text-[12px] right-2 bottom-1">
                    {message.createdAt &&
                      new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </div>
              ))}
          </div>
          <div>
            <form
              onSubmit={(e) => {
                handleSendMessage(e);
              }}
              className="flex justify-between my-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-white mx-4 px-4 border border-gray-500 text-[18px] rounded-xl w-full"
              />
              <button
                type="submit"
                className="w-24 mx-4 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;