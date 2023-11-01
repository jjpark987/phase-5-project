import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';
import attributesSlice from './slices/attributesSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        attributes: attributesSlice
    }
});

export default store;
