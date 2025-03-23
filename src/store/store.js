import { configureStore } from "@reduxjs/toolkit";
import adminRducer from "./adminSlice/adminSlice";
import userReducer from "./userSlice/userSlice";
import errorMiddleware from "./middleware/errorMiddleware";
import rootReducer from "./userSlice/rootReducer";

const store = configureStore({
    reducer:{
       admin: adminRducer,
       user: rootReducer,
        // Add more reducers here if needed...
     },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware), // Add the custom error middleware to the default ones
})


export default store;