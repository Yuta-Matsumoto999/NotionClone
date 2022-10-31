import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;