import axios from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";
import { SignupFormData } from "../../../models";

interface LooseObject {
  [key: string]: any;
}

const getUserProfile = () => {
  return axios.get(BASE_URL + "/user/profile/me", { headers: authHeader() });
};

const updateUserProfile = (formData: SignupFormData) => {
  let body: LooseObject = {};
  body = {
    name: formData.name,
    email: formData.email,
  };
  if (formData.photo !== "") {
    body = { ...body, photo: formData.photo };
  }
  if (formData.password !== "") {
    body = { ...body, password: formData.password };
  }

  return axios.put(BASE_URL + "/user/profile/me", body, {
    headers: authHeader(),
  });
};

const getMemberships = () => {
  return axios.get(BASE_URL + "/user/memberships/my-memberships", {
    headers: authHeader(),
  });
};

const buyMembership = (data: {
  id: string;
  startDate: Date;
  endDate: Date;
  role: string;
}) => {
  return axios.post(BASE_URL + `/user/memberships/buy/${data.id}`, data, {
    headers: authHeader(),
  });
};

const userService = { getUserProfile, updateUserProfile, getMemberships, buyMembership };

export default userService;