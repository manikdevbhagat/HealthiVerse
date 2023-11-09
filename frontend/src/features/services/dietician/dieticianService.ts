import axios from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";
import { SignupFormData } from "../../../models";

interface LooseObject {
  [key: string]: any;
}

const getDieticianProfile = () => {
  return axios.get(BASE_URL + "/dietician/profile/me", { headers: authHeader() });
};

const updateDieticianProfile = (formData: SignupFormData) => {
  let body: LooseObject = {};
  body = { ...formData };
  if (formData.password === "") {
    delete body["password"];
  }
  if (formData.photo === "") {
    delete body["photo"];
  }
  console.log(body);
  return axios.put(BASE_URL + "/dietician/profile/me", body, {
    headers: authHeader(),
  });
};

const getAllDieticians = () => {
  return axios.get(BASE_URL + "/dietician");
};

const getSingleDietician = (id: string) => {
  return axios.get(BASE_URL + `/dietician/${id}`);
};

const getMemberships = () => {
  return axios.get(BASE_URL + "/dietician/memberships/my-memberships", {
    headers: authHeader(),
  });
};
const addReview = (data: {
  id: string;
  rating: number;
  reviewText: string;
}) => {
  return axios.post(
    BASE_URL + `/dietician/${data.id}/reviews`,
    { rating: data.rating, reviewText: data.reviewText },
    { headers: authHeader() }
  );
};

const dieticianService = {
  getDieticianProfile,
  updateDieticianProfile,
  getAllDieticians,
  getSingleDietician,
  addReview,
  getMemberships
};

export default dieticianService;