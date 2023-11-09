import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Membership } from "../../../models";
import dieticianService from "../../services/dietician/dieticianService";

export const getDieticianMemberships = createAsyncThunk(
  "dietician/getMemberships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dieticianService.getMemberships();
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

interface membershipsState {
  memberships: Membership[] | [];
  loading: boolean;
}

const initialState: membershipsState = {
  memberships: [],
  loading: false,
};

const dieticianMembershipsSlice = createSlice({
  name: "dietician/memberships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getDieticianMemberships.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getDieticianMemberships.fulfilled.type,
      (state, action) => {
        const memberships = action.payload.data;
        state.loading = false;
        state.memberships = memberships;
      }
    );

    builder.addMatcher(
      (action) => action.type === getDieticianMemberships.rejected.type,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const dieticianMembershipsReducer = dieticianMembershipsSlice.reducer;