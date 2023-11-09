import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Dietician } from "../../../models";
import dieticianService from "../../services/dietician/dieticianService";

export const getSingleDietician = createAsyncThunk(
  "dietician/single",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await dieticianService.getSingleDietician(id);
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

interface singleDieticianState {
  dietician: Dietician | null;
  loading: boolean;
}

const initialState: singleDieticianState = {
  dietician: null,
  loading: false,
};

const singleDieticianSlice = createSlice({
  name: "dietician/single",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getSingleDietician.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleDietician.fulfilled.type,
      (state, action) => {
        const dietician = action.payload.data;
        state.loading = false;
        state.dietician = dietician;
      }
    );

    builder.addMatcher(
      (action) => action.type === getSingleDietician.rejected.type,
      (state) => {
        state.loading = false;
        state.dietician = null;
      }
    );
  },
});

export const singleDieticianReducer = singleDieticianSlice.reducer;