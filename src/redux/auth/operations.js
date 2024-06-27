import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setAutToken = (token) =>
  (axios.defaults.headers["Authorization"] = token);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/user/signup", userData);
      setAutToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const isLogin = createAsyncThunk(
  "auth/isLogin",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/user/login", userData);
      setAutToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const exit = createAsyncThunk("auth/exit", async (_, thunkAPI) => {
  try {
    const { data } = await axios.post("/user/logout");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const information = createAsyncThunk(
  "auth/information",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Failed to fetch user data");
    }

    try {
      const { data } = await axios.get("/user/current");
      return {
        token: persistedToken,
        user: data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
