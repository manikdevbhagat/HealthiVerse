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
        {!chats.length && (
          <h2 className="text-gray-600 text-center text-3xl">
            No chats started yet
          </h2>
        )}
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
            } px-4 py-2 rounded-lg h-[70px] cursor-pointer h-auto`}
          >
            <div className="flex flex-row items-center justify-left gap-4">
              <div className="min-w-[55px]">
                <img
                  className="rounded-full h-[50px] w-[55px]"
                  src={user ? getChatData(user._id, chat).photo : ""}
                  alt=""
                />
              </div>
              <div className="min-w-0 w-full flex flex-col flex-initial">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {user && getChatData(user._id, chat).name}
                  </h3>
                  <p className="text-[11px]">
                    {chat.latestMessage &&
                      new Date(chat.latestMessage.createdAt).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] truncate">
                    {chat.latestMessage?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChats;