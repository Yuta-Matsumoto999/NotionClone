import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        setTag: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTag } = tagSlice.actions;
export default tagSlice.reducer;