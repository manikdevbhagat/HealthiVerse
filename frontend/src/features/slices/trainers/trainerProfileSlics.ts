import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Trainer, SignupFormData, User } from "../../../models";
import { AxiosError } from "axios";
import trainerService from "../../services/trainer/trainerService";

export const getTrainerProfile = createAsyncThunk(
  "trainer/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getTrainerProfile();
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

export const updateTrainerProfile = createAsyncThunk(
  "trainer/updateProfile",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await trainerService.updateTrainerProfile(formData);
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

interface TrainerState {
  trainerProfile: Trainer | null;
  loading: boolean;
}

const initialState: TrainerState = {
  trainerProfile: null,
  loading: false,
};

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getTrainerProfile.pending.type ||
        action.type === updateTrainerProfile.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getTrainerProfile.fulfilled.type ||
        action.type === updateTrainerProfile.fulfilled.type,
      (state, action) => {
        const trainer = action.payload.data;
        state.loading = false;
        state.trainerProfile = trainer;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getTrainerProfile.rejected.type ||
        action.type === updateTrainerProfile.rejected.type,
      (state) => {
        state.loading = false;
        state.trainerProfile = null;
      }
    );
  },
});

export const trainerProfileReducer = trainerSlice.reducer;