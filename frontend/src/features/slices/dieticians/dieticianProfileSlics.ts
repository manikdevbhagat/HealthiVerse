import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dietician, SignupFormData, } from "../../../models";
import { AxiosError } from "axios";
import dieticianService from "../../services/dietician/dieticianService";

export const getDieticianProfile = createAsyncThunk(
  "dietician/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dieticianService.getDieticianProfile();
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

export const updateDieticianProfile = createAsyncThunk(
  "dietician/updateProfile",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await dieticianService.updateDieticianProfile(formData);
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

interface DieticianState {
  dieticianProfile: Dietician | null;
  loading: boolean;
}

const initialState: DieticianState = {
  dieticianProfile: null,
  loading: false,
};

const dieticianSlice = createSlice({
  name: "dietician",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getDieticianProfile.pending.type ||
        action.type === updateDieticianProfile.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getDieticianProfile.fulfilled.type ||
        action.type === updateDieticianProfile.fulfilled.type,
      (state, action) => {
        const dietician = action.payload.data;
        state.loading = false;
        state.dieticianProfile = dietician;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getDieticianProfile.rejected.type ||
        action.type === updateDieticianProfile.rejected.type,
      (state) => {
        state.loading = false;
        state.dieticianProfile = null;
      }
    );
  },
});

export const dieticianProfileReducer = dieticianSlice.reducer;