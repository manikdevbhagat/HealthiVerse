import { Chat } from "../models";

export const getChatData = (myId: string, chat: Chat)=>{
  if(chat.client._id===myId){
    return chat.business.businessData
  }else{
    return chat.client;
  }
}