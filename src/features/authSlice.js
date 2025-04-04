import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://b1648984c18dc7b9.mokky.dev";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await axios.get(
      `${BASE_URL}/users?email=${email}&password=${password}`
    );
    if (response.data.length === 0) throw new Error("Invalid credentials");
    return response.data[0];
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: null, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
