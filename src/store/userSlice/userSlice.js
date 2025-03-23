import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, postLoginData, postRegisterData } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [], 
    postLoginDatas: [], 
    NormalRegisterdata:[], 
    token: localStorage.getItem("token") || null, // Initialize token from localStorage
    userRole : localStorage.getItem("userRole") || null, // Initialize token from localStorage
    status: "idle",
    error: null, 
  },
  reducers: {
    // Action to clear the user data and token
    clearUserData: (state) => {
      state.token = null;
      state.userData = [];
      state.postLoginDatas = [];
      localStorage.removeItem("token"); // Clear token from localStorage as well
      localStorage.removeItem("userRole"); // Clear token from localStorage as well
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(postLoginData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postLoginDatas = action.payload;
       
        if (action.payload.token) {
          state.token = action.payload.token;
          state.userRole = action.payload.user.type;
          localStorage.setItem("token", action.payload.token); // Store token in localStorage
          localStorage.setItem("userRole", action.payload.user.type); // Store token in localStorage
        }
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(postRegisterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postRegisterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.NormalRegisterdata = action.payload;
      })
      .addCase(postRegisterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
