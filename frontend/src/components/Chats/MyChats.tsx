import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { setCurrentChat } from "../../features/slices/chat/currentChatSlice";
import { getAllChats } from "../../features/slices/chat/allChatsSlice";
import { getChatData } from "../../utils/getChatData";
import { setChatWindow } from "../../features/slices/chat/chatWindowSlice";

const MyChats = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login);
  const { chats } = useAppSelector((state) => state.allChats);
  const { currentChat } = useAppSelector((state) => state.currentChat);
  useEffect(() => {
    dispatch(getAllChats());
  }, []);
  return (
    <div className="h-full bg-gray-100 rounded-xl">
      <div className="text-white font-bold px-6 py-2 text-3xl bg-gray-600 rounded-t-xl">
        Chats
      </div>
      <div className="flex flex-col px-6 py-2 gap-4 mt-4">
        {chats?.map((chat) => (
          <div
            key={chat._id}
            onClick={() => {
              dispatch(setCurrentChat(chat));
              dispatch(setChatWindow("messages"));
            }}
            className={`${
              currentChat?._id === chat._id
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            } px-4 py-2 rounded-lg h-[70px] cursor-pointer`}
          >
            <div className="flex items-center justify-left gap-4">
              <div>
                <img
                  className="rounded-full h-[50px] w-[55px]"
                  src={user ? getChatData(user._id, chat).photo : ""}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <div className="font-semibold">
                    {user && getChatData(user._id, chat).name}
                  </div>
                  <div>
                    {chat.latestMessage &&
                      new Date(chat.latestMessage.createdAt).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                  </div>
                </div>
                <div>{chat.latestMessage?.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChats;