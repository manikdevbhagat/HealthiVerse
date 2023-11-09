import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Membership } from "../../../models";
import trainerService from "../../services/trainer/trainerService";

export const getTrainerMemberships = createAsyncThunk(
  "trainer/getMemberships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getMemberships();
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

const trainerMembershipsSlice = createSlice({
  name: "trainer/memberships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getTrainerMemberships.pending.type,
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type === getTrainerMemberships.fulfilled.type,
      (state, action) => {
        const memberships = action.payload.data;
        state.loading = false;
        state.memberships = memberships;
      }
    );

    builder.addMatcher(
      (action) => action.type === getTrainerMemberships.rejected.type,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const trainerMembershipsReducer = trainerMembershipsSlice.reducer;