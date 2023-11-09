import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Trainer } from "../../../models";
import trainerService from "../../services/trainer/trainerService";

export const getSingleTrainer = createAsyncThunk(
  "trainer/single",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await trainerService.getSingleTrainer(id);
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

interface singleTrainerState {
  trainer: Trainer | null;
  loading: boolean;
}

const initialState: singleTrainerState = {
  trainer: null,
  loading: false,
};

const singleTrainerSlice = createSlice({
  name: "trainer/single",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getSingleTrainer.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleTrainer.fulfilled.type,
      (state, action) => {
        const trainer = action.payload.data;
        state.loading = false;
        state.trainer = trainer;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleTrainer.rejected.type,
      (state) => {
        state.loading = false;
        state.trainer = null;
      }
    );
  },
});

export const singleTrainerReducer = singleTrainerSlice.reducer;