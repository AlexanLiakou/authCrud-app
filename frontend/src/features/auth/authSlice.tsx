import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterRequest, LoginRequest } from "../../types/auth.ts";
import {logoutUser, registerUser, loginUser} from '../../api/auth.ts';

//Get user for local storage

const user = JSON.parse(localStorage.getItem('user')  ?? 'null');

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Register User

export const register = createAsyncThunk('auth/register', async (user : RegisterRequest, thunkAPI) => {
  try {
    return await registerUser(user);
  }
  catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error;
    return thunkAPI.rejectWithValue(message);
  }
})

export const login = createAsyncThunk('auth/login', async (user : LoginRequest, thunkAPI) => {
  try {
    return await loginUser(user);
  }
  catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error;
    return thunkAPI.rejectWithValue(message);
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;