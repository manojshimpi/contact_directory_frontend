// src/store/userActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch User Data (GET API with Token)
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch("http://localhost:5000/auth/user", {
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
export const postRegisterData = createAsyncThunk(
  "user/postRegisterData",
  async (NormalRegisterdata, { rejectWithValue }) => {
    console.log("Register" + JSON.stringify(NormalRegisterdata,null,2))
    try {
       const response = await fetch("http://localhost:5000/auth/registernormal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NormalRegisterdata), // Send post data
      });

      if (!response.ok) throw new Error("Failed to post user data");

      return await response.json(); // Return the response data from the POST request
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);


//For login Normal

export const postLoginData = createAsyncThunk(
  "user/postLoginData",
  async (postLoginDatas, {rejectWithValue }) => {
    //console.log("I am Action" + JSON.stringify(postLoginDatas,null,2))
    try {
      const response = await fetch("http://localhost:5000/auth/normallogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postLoginDatas), // Send post data
      });
     
      if (!response.ok) throw new Error("Failed to post user data");

      return await response.json(); // Return the response data from the POST request
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);


export const logout = ()=>{
  localStorage.clear(); // Clears all items from localStorage
  window.location.href = "/"; // Redirect to login page
}