import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';
import attributesSlice from './slices/attributesSlice';
import userRecipesSlice from './slices/userRecipesSlice';
import recipeSlice from './slices/recipeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        attributes: attributesSlice,
        userRecipes: userRecipesSlice,
        recipe: recipeSlice
    }
});

export default store;
