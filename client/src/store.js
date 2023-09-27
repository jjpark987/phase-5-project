import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice
    }
});

export default store;
