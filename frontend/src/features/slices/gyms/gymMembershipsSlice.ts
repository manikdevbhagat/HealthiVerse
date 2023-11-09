import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Membership } from "../../../models";
import gymService from "../../services/gym/gymService";

export const getGymMemberships = createAsyncThunk(
  "user/getMemberships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await gymService.getMemberships();
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

const gymMembershipsSlice = createSlice({
  name: "user/memberships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getGymMemberships.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getGymMemberships.fulfilled.type,
      (state, action) => {
        const memberships = action.payload.memberships;
        state.loading = false;
        state.memberships = memberships;
      }
    );

    builder.addMatcher(
      (action) => action.type === getGymMemberships.rejected.type,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const gymMembershipsReducer = gymMembershipsSlice.reducer;