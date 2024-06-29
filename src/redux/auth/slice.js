import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { registerUser, isLogin, information, exit } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const setAvtor = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const initSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Если у вас нет дополнительных редукторов, оставьте пустым
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, setAvtor)
      .addCase(isLogin.fulfilled, setAvtor)
      .addCase(information.pending, (state) => {
        state.isRefreshing = true; // Было: state.information = true; Исправление: исправлено на state.isRefreshing
      })
      .addCase(information.fulfilled, (state, action) => {
        setAvtor(state, action);
        state.isRefreshing = false;
      })
      .addCase(information.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(exit.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false; // Было: state.isLoggedInc = false; Исправление: исправлено на state.isLoggedIn
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Было: whiteList: ["token"]; Исправление: whitelist вместо whiteList
};

export const authReducer = persistReducer(persistConfig, initSlice.reducer);
