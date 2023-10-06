import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        id: 0,
        sex: '',
        age: 0,
        heightFeet: 0,
        heightInches: 0,
        weight: 0,
        activityLevel: '',
        healthGoal: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        bmr: 0,
        tdee: 0,
        recommendedCalories: 0
    },
    reducers: {
        updateProfile: (state, action) => {
            state.id = action.payload.id;
            state.sex = action.payload.sex;
            state.age = action.payload.age;
            state.heightFeet = action.payload.height_feet;
            state.heightInches = action.payload.height_inches;
            state.weight = action.payload.weight;
            state.activityLevel = action.payload.activity_level;
            state.healthGoal = action.payload.health_goal;
            state.vegetarian = action.payload.vegetarian;
            state.vegan = action.payload.vegan;
            state.glutenFree = action.payload.gluten_free;
            state.dairyFree = action.payload.dairy_free;
            state.bmr = action.payload.bmr;
            state.tdee = action.payload.tdee;
            state.recommendedCalories = action.payload.recommended_calories;

        },
        clearProfile: state => {
            state.id = 0;
            state.sex = '';
            state.age = 0;
            state.heightFeet = 0;
            state.heightInches = 0;
            state.weight = 0;
            state.activityLevel = '';
            state.healthGoal = '';
            state.vegetarian = false;
            state.vegan = false;
            state.glutenFree = false;
            state.dairyFree = false;
            state.bmr = 0;
            state.tdee = 0;
            state.recommendedCalories = 0;
        }
    }
});

export const { updateProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
