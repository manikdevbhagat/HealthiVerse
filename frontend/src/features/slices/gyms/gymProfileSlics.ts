import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gym, SignupFormData } from "../../../models";
import { AxiosError } from "axios";
import gymService from "../../services/gym/gymService";

export const getGymProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await gymService.getGymProfile();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return rejectWithValue(message);
      }
      console.log(error);
    }
  }
);

export const updateGymProfile = createAsyncThunk(
  "user/getProfile",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await gymService.updateGymProfile(formData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return rejectWithValue(message);
      }
      console.log(error);
    }
  }
);

interface gymState {
  gymProfile: Gym | null;
  loading: boolean;
}

const initialState: gymState = {
  gymProfile: null,
  loading: false,
};

const gymSlice = createSlice({
  name: "gym",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getGymProfile.pending.type ||
        action.type === updateGymProfile.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getGymProfile.fulfilled.type ||
        action.type === updateGymProfile.fulfilled.type,
      (state, action) => {
        const gym = action.payload.gym;
        state.loading = false;
        state.gymProfile = gym;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getGymProfile.rejected.type ||
        action.type === updateGymProfile.rejected.type,
      (state) => {
        state.loading = false;
        state.gymProfile = null;
      }
    );
  },
});

export const gymProfileReducer = gymSlice.reducer;