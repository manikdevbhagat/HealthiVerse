import axios from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";
import { SignupFormData } from "../../../models";

interface LooseObject {
  [key: string]: any;
}

const getGymProfile = () => {
  return axios.get(BASE_URL + "/gym/profile/me", { headers: authHeader() });
};

const updateGymProfile = (formData: SignupFormData) => {
  let body: LooseObject = {};
  body = { ...formData };
  if (formData.password === "") {
    delete body["password"];
  }
  if (formData.photo === "") {
    delete body["photo"];
  }
  console.log(body);
  return axios.put(BASE_URL + "/gym/profile/me", body, {
    headers: authHeader(),
  });
};

const getAllGyms = () => {
  return axios.get(BASE_URL + "/gym");
};

const getSingleGym = (id: string) => {
  return axios.get(BASE_URL + `/gym/${id}`);
};

const getMemberships = () => {
  return axios.get(BASE_URL + "/gym/memberships/my-memberships", {
    headers: authHeader(),
  });
};
const addReview = (data: {
  id: string;
  rating: number;
  reviewText: string;
}) => {
  return axios.post(
    BASE_URL + `/gym/${data.id}/reviews`,
    { rating: data.rating, reviewText: data.reviewText },
    { headers: authHeader() }
  );
};

const gymService = {
  getGymProfile,
  updateGymProfile,
  getAllGyms,
  getSingleGym,
  addReview,
  getMemberships
};

export default gymService;