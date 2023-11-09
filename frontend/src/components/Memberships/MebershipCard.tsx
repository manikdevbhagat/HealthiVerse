import React, {useState} from "react";
import { Membership } from "../../models";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { createChat, setCurrentChat } from "../../features/slices/chat/currentChatSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface Props {
  member: Membership;
  memberType: string;
}

const MembershipCard = ({ member, memberType }: Props) => {
  const [startingChat, setStartingChat] = useState<{
    id: string;
    loading: boolean;
  }>({ id: "", loading: false });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { chats } = useAppSelector((state) => state.allChats);

  const handleChat = async (id: string, role: string) => {
    const data = { id: id, role: role };
    setStartingChat({ id: id, loading: true });
    for (const chat of chats) {
      if (chat.business.businessData._id === id) {
        dispatch(setCurrentChat(chat));
        setStartingChat({ id: "", loading: false });
        return navigate("/chats");
      }
    }
    await dispatch(createChat(data)).unwrap();
    setStartingChat({ id: "", loading: false });
    navigate("/chats");
  };


  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-6">
        <div>
          <img
            className=" w-[350px] h-[250px] object-cover rounded-t-xl"
            src={member.photo}
            alt=""
          />
        </div>
        <div className="shadow-xl p-4 rounded-b-xl">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold max-w-[320px] truncate">
            {member.name}
          </h3>

          <div className="flex items-center gap-3 mt-2">
            <span className="ml-1 text-textColor font-[700]">
              Membership Ending:
            </span>
            <p className="max-w-[290px] truncate">
              {new Date(member.endDate).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleChat(member._id, memberType)}
        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
      >
        {startingChat.id === member._id && startingChat.loading === true ? (
          <ClipLoader className="mx-auto" size={25} color="white" />
        ) : (
          "Chat"
        )}
      </button>
    </div>
  );
};

export default MembershipCard;