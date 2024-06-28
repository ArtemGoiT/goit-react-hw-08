import persistReducer from "redux-persist/es/persistReducer";

const { default: storage } = "redux-persist/lib/storage";

const { createSlice } = "@reduxjs/toolkit";
const { registerUser, isLogin, information, exit } = "./operations";

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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, setAvtor)

      .addCase(isLogin.fulfilled, setAvtor)

      .addCase(information.pending, (state) => {
        state.information = true;
      })
      .addCase(information.fulfilled, (state, action) => {
        setAvtor(state, action);
        state.isRefreshing = false;
      })
      .addCase(information.reject, (state) => {
        state.isRefreshing = false;
      })
      .addCase(exit.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedInc = false;
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whiteList: ["token"],
};

export const authReducer = persistReducer(persistConfig, initSlice.reducer);
