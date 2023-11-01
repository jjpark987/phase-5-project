import { createSlice } from "@reduxjs/toolkit";

const attributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        cuisines: [],
        types: []
    },
    reducers: {
        updateAttributes: (state, action) => {
            return {
                ...state,
                cuisines: action.payload.cuisines,
                types: action.payload.types
            }
        }
    }
});

export const { updateAttributes } = attributesSlice.actions;

export default attributesSlice.reducer;
