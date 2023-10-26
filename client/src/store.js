import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';
import attributesSlice from './reducers/attributesSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        attributes: attributesSlice
    }
});

export default store;
