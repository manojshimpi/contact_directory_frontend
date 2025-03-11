import { configureStore } from "@reduxjs/toolkit";
import adminRducer from "./adminSlice/adminSlice";
import userReducer from "./userSlice/userSlice";
import errorMiddleware from "./middleware/errorMiddleware";

const store = configureStore({
    reducer:{
       admin: adminRducer,
       user: userReducer,
        // Add more reducers here if needed...
     },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware), // Add the custom error middleware to the default ones
})


export default store;