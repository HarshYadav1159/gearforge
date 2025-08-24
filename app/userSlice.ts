import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./models/user_model";

interface UserState {
  user: User;
  isLoggedIn: boolean;
}

const user: User = {
  name: "",
  user_id: "",
  user_name: "",
  email: "",
  division: 3,
};

const initUserState: UserState = {
  user: user,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initUserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.user.user_id = action.payload;
    },

    loginUser: (state) => {
      state.isLoggedIn = true;
    },

    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = user
    },
  },
});

export const { setUser, setUserId , loginUser, logoutUser} = userSlice.actions;