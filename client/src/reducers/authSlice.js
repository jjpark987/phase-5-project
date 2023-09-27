import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: 0,
        email: '',
        username: ''
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
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
