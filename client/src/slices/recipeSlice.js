import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        id: 0,
        name: '',
        image: '',
        cuisines: [],
        types: [],
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        servings: 0,
        ingredients: [],
        instructions: []
    },
    reducers: {
        updateRecipe: (state, action) => {
            const { id, name, image, cuisines, types, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, calories, proteins, carbs, fats, servings, ingredients, instructions } = action.payload;
            state.id = id;
            state.name = name;
            state.image = image;
            state.cuisines = [...cuisines];
            state.types = [...types];
            state.isVegetarian = is_vegetarian;
            state.isVegan = is_vegan;
            state.isGlutenFree = is_gluten_free;
            state.isDairyFree = is_dairy_free;
            state.calories = calories;
            state.proteins = proteins;
            state.carbs = carbs;
            state.fats = fats;
            state.servings = servings;
            state.ingredients = [...ingredients];
            state.instructions = [...instructions];
        },
        // clearRecipe: state => {
        //     state.id = 0;
        //     state.name = '';
        //     state.image = '';
        //     state.cuisines = [];
        //     state.types = [];
        //     state.isVegetarian = false;
        //     state.isVegan = false;
        //     state.isGlutenFree = false;
        //     state.isDairyFree = false;
        //     state.calories = 0;
        //     state.proteins = 0;
        //     state.carbs = 0;
        //     state.fats = 0;
        //     state.servings = 0;
        //     state.ingredients = [];
        //     state.instructions = [];
        // }
    }
});

export const { updateRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
