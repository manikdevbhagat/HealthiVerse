import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignupFormData, User } from "../../../models";
import userService from "../../services/user/userService";
import { AxiosError } from "axios";

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUserProfile();
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

export const updateUserProfile = createAsyncThunk(
  "user/getProfile",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await userService.updateUserProfile(formData);
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

interface userState {
  userProfile: User | null;
  loading: boolean;
}

const initialState: userState = {
  userProfile: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getUserProfile.pending.type ||
        action.type === updateUserProfile.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getUserProfile.fulfilled.type ||
        action.type === updateUserProfile.fulfilled.type,
      (state, action) => {
        const user = action.payload.user;
        state.loading = false;
        state.userProfile = user;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === getUserProfile.rejected.type ||
        action.type === updateUserProfile.rejected.type,
      (state) => {
        state.loading = false;
        state.userProfile = null;
      }
    );
  },
});

export const userProfileReducer = userSlice.reducer;