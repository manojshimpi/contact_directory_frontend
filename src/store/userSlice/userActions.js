// src/store/userActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch User Data (GET API with Token)
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      return await response.json(); // Return the user data
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// Post User Data (POST API with Token)
export const postUserData = createAsyncThunk(
  "user/postUserData",
  async (postUserdetails, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postUserdetails), // Send post data
      });

      if (!response.ok) throw new Error("Failed to post user data");

      return await response.json(); // Return the response data from the POST request
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);
