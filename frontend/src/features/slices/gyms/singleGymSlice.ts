import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gymService from "../../services/gym/gymService";
import { AxiosError } from "axios";
import { Gym } from "../../../models";

export const getSingleGym = createAsyncThunk(
  "gym/single",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await gymService.getSingleGym(id);
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

interface singleGymState {
  gym: Gym | null;
  loading: boolean;
}

const initialState: singleGymState = {
  gym: null,
  loading: false,
};

const singleGymSlice = createSlice({
  name: "gym/single",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getSingleGym.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleGym.fulfilled.type,
      (state, action) => {
        const gym = action.payload.gym;
        state.loading = false;
        state.gym = gym;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleGym.rejected.type,
      (state) => {
        state.loading = false;
        state.gym = null;
      }
    );
  },
});

export const singleGymReducer = singleGymSlice.reducer;