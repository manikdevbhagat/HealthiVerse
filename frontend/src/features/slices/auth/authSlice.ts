import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import authService from "../../services/auth/authService";
import { LoginFormData, SignupFormData, User } from "../../../models";

interface AuthState {
  user: User | null;
  loading: boolean;
  role: "client" | "gym" | "trainer" | "dietician" | null;
  token: string | null;
}

// Create an asynchronous thunk action for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(formData);
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await authService.login(formData);
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

const initialState: AuthState = {
  user: null,
  loading: false,
  role: null,
  token: null,
};

const signupSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.role = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user, role, token } = action.payload;
      state.loading = false;
      state.user = user;
      state.role = role;
      state.token = token;
      localStorage.setItem("token", token);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.role = null;
    });
  },
});

export const signupReducer = signupSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const { logout } = loginSlice.actions;