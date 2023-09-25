import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: 0
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload
        }
    }
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
