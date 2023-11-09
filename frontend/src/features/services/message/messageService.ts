import axios from "axios";
import { BASE_URL } from "../../../config";
import authHeader from "../auth/authHeader";

export interface MessageData {
  content: string;
  chatId: string;
}

const sendMessage = (data: MessageData) => {
  return axios.post(BASE_URL + "/message", data, { headers: authHeader() });
};

const getAllMessages = (chatId: string) => {
  return axios.get(BASE_URL + `/message/${chatId}`, { headers: authHeader() });
};

export const messageService = { sendMessage, getAllMessages };