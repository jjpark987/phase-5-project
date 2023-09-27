import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: 0,
        email: '',
        username: '',
        profileCreated: false
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        logout: state => {
            state.id = 0;
            state.email = '';
            state.username = '';
            state.profileCreated = false;
        },
        profileCreated: state => {
            state.profileCreated = true;
        }
    }
});

export const { login, logout, profileCreated } = authSlice.actions;

export default authSlice.reducer;
