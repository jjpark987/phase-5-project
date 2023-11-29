import { createSlice } from "@reduxjs/toolkit";

const userRecipesSlice = createSlice({
    name: 'userRecipes',
    initialState: {
        userRecipes: []
    },
    reducers: {
        updateUserRecipes: (state, action) => {
            state.userRecipes = action.payload;
        },
        clearUserRecipes: state => {
            state.userRecipes = [];
        }
    }
});

export const { updateUserRecipes, clearUserRecipes } = userRecipesSlice.actions;

export default userRecipesSlice.reducer;
