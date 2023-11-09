import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user/userService";
import { AxiosError } from "axios";
import { Membership } from "../../../models";

export const getUserMemberships = createAsyncThunk(
  "user/getMemberships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getMemberships();
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

export const buyMembership = createAsyncThunk(
  "user/membership/buy",
  async (
    data: {
      id: string;
      startDate: Date;
      endDate: Date;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.buyMembership(data);
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
  memberships: {
    gyms: Membership[];
    trainers: Membership[];
    dieticians: Membership[];
  };
  loading: boolean;
}

const initialState: membershipsState = {
  memberships: { gyms: [], trainers: [], dieticians: [] },
  loading: false,
};

const UserMembershipsSlice = createSlice({
  name: "user/memberships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type ===
        (getUserMemberships.pending.type || buyMembership.pending.type),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type ===
        (getUserMemberships.fulfilled.type),
      (state, action) => {
        const memberships = action.payload.memberships;
        state.loading = false;
        state.memberships = memberships;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type ===
        (getUserMemberships.rejected.type || buyMembership.rejected.type),
      (state) => {
        state.loading = false;
      }
    );

  },
});

export const userMembershipsReducer = UserMembershipsSlice.reducer;