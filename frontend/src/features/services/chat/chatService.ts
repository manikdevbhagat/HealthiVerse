import axios from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";

const getAllChats = () => {
  return axios.get(BASE_URL + "/chat", { headers: authHeader() });
};

const createChat = (data:{id: string, role: string}) => {
  return axios.post(BASE_URL + `/chat`,{receiverId: data.id, receiverType: data.role}, { headers: authHeader() });
};

const chatService = {getAllChats, createChat};
export default chatService;