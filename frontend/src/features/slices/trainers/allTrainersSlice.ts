import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Trainer } from "../../../models";
import trainerService from "../../services/trainer/trainerService";

export const getAllTrainers = createAsyncThunk(
  "trainers/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getAllTrainers();
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

interface allTrainersState {
  trainers: Trainer[];
  loading: boolean;
}

const initialState: allTrainersState = {
  trainers: [],
  loading: false,
};

const allTrainersSlice = createSlice({
  name: "trainers/all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getAllTrainers.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getAllTrainers.fulfilled.type,
      (state, action) => {
        const trainers = action.payload.data;
        state.loading = false;
        state.trainers = trainers;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getAllTrainers.rejected.type,
      (state) => {
        state.loading = false;
        state.trainers = [];
      }
    );
  },
});

export const allTrainersReducer = allTrainersSlice.reducer;
