import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Dietician } from "../../../models";
import dieticianService from "../../services/dietician/dieticianService";

export const getAllDieticians = createAsyncThunk(
  "dieticians/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dieticianService.getAllDieticians();
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

interface allDieticiansState {
  dieticians: Dietician[];
  loading: boolean;
}

const initialState: allDieticiansState = {
  dieticians: [],
  loading: false,
};

const allDieticiansSlice = createSlice({
  name: "dieticians/all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllDieticians.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllDieticians.fulfilled.type,
      (state, action) => {
        const dieticians = action.payload.data;
        state.loading = false;
        state.dieticians = dieticians;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllDieticians.rejected.type,
      (state) => {
        state.loading = false;
        state.dieticians = [];
      }
    );
  },
});

export const allDieticiansReducer = allDieticiansSlice.reducer;