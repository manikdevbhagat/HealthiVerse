import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gymService from "../../services/gym/gymService";
import { AxiosError } from "axios";
import { Gym } from "../../../models";

export const getAllGyms = createAsyncThunk(
  "gyms/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await gymService.getAllGyms();
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

interface allGymsState {
  gyms: Gym[];
  loading: boolean;
}

const initialState: allGymsState = {
  gyms: [],
  loading: false,
};

const allGymsSlice = createSlice({
  name: "gyms/all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getAllGyms.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getAllGyms.fulfilled.type,
      (state, action) => {
        const gyms = action.payload.gyms;
        state.loading = false;
        state.gyms = gyms;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getAllGyms.rejected.type,
      (state) => {
        state.loading = false;
        state.gyms = [];
      }
    );
  },
});

export const allGymsReducer = allGymsSlice.reducer;
