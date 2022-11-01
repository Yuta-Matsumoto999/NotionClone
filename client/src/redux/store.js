import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";
import projectReducer from "./features/projectSlice";
import tagReducer from ".//features/tagSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        memo: memoReducer,
        project: projectReducer,
        tag: tagReducer
    },
});