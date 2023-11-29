import { createSlice } from "@reduxjs/toolkit";

const attributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        cuisines: [],
        types: []
    },
    reducers: {
        updateAttributes: (state, action) => {
            state.cuisines = action.payload.cuisines;
            state.types = action.payload.types;
        }
    }
});

export const { updateAttributes } = attributesSlice.actions;

export default attributesSlice.reducer;
