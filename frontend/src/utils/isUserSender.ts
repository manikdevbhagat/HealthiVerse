import { Message } from "../models";

export const isUserSender = (myId: string, message: Message)=>{
  if(message.sender.senderData===myId) return true;
  return false;
}