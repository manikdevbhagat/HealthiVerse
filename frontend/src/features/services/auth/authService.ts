import axios from "axios";
import { BASE_URL } from "../../../config";
import { LoginFormData, SignupFormData } from "../../../models";

const signup = (formData: SignupFormData)=>{
  return axios.post(BASE_URL+"/auth/signup", formData);
}

const login = (formData: LoginFormData)=>{
  return axios.post(BASE_URL+"/auth/login", formData);
}

const authService = { signup, login };

export default authService;