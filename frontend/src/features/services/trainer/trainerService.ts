import axios from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";
import { SignupFormData } from "../../../models";

interface LooseObject {
  [key: string]: any;
}

const getTrainerProfile = () => {
  return axios.get(BASE_URL + "/trainer/profile/me", { headers: authHeader() });
};

const updateTrainerProfile = (formData: SignupFormData) => {
  let body: LooseObject = {};
  body = { ...formData };
  if (formData.password === "") {
    delete body["password"];
  }
  if (formData.photo === "") {
    delete body["photo"];
  }
  console.log(body);
  return axios.put(BASE_URL + "/trainer/profile/me", body, {
    headers: authHeader(),
  });
};

const getAllTrainers = () => {
  return axios.get(BASE_URL + "/trainer");
};

const getSingleTrainer = (id: string) => {
  return axios.get(BASE_URL + `/trainer/${id}`);
};

const getMemberships = () => {
  return axios.get(BASE_URL + "/trainer/memberships/my-memberships", {
    headers: authHeader(),
  });
};
const addReview = (data: {
  id: string;
  rating: number;
  reviewText: string;
}) => {
  return axios.post(
    BASE_URL + `/trainer/${data.id}/reviews`,
    { rating: data.rating, reviewText: data.reviewText },
    { headers: authHeader() }
  );
};

const trainerService = {
  getTrainerProfile,
  updateTrainerProfile,
  getAllTrainers,
  getSingleTrainer,
  addReview,
  getMemberships
};

export default trainerService;