import axios, { AxiosError } from "axios";
import authHeader from "../auth/authHeader";
import { BASE_URL } from "../../../config";

const addReview = async (data: {
  id: string;
  rating: number;
  reviewText: string;
  businessRole: string;
}) => {
  try {
    const response = await axios.post(
      BASE_URL + `/${data.businessRole}/${data.id}/reviews`,
      {
        rating: data.rating,
        reviewText: data.reviewText,
        businessRole: data.businessRole,
      },
      { headers: authHeader() }
    );
    return {success: true, message: response.data.message};
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return {success:false, message: message};
    }
    console.log(error);
  }
};

const reviewService = {
  addReview,
};

export default reviewService;