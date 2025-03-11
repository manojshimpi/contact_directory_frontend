// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, postUserData } from "./userActions"; // Import the actions from userActions.js

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    postUserdetails: [],
    status: "idle", // Initial status
    error: null, // Error state
  },
  reducers: {}, // You can add synchronous actions here if needed
  extraReducers: (builder) => {
    // Handle fetchUserData
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"; // Set loading state
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded state on success
        state.userData = action.payload; // Store the fetched user data
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed"; // Set failed state on error
        state.error = action.payload; // Store error message
      });

    // Handle postUserData
    builder
      .addCase(postUserData.pending, (state) => {
        state.status = "loading"; // Set loading state
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded state on success
        state.postUserdetails = action.payload; // Store the posted data
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.status = "failed"; // Set failed state on error
        state.error = action.payload; // Store error message
      });
  },
});

export default userSlice.reducer;
