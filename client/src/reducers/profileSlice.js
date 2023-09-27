import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        sex: 'male',
        age: 0,
        weight: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        healthGoal: 'maintain'
    },
    reducers: {
        updateProfile: (state, action) => {
            state.sex = action.payload.sex;
            state.age = action.payload.age;
            state.weight = action.payload.weight;
            state.vegetarian = action.payload.vegetarian;
            state.vegan = action.payload.vegan;
            state.glutenFree = action.payload.gluten_free;
            state.dairyFree = action.payload.dairy_free;
            state.healthGoal = action.payload.health_goal;
        },
        clearProfile: state => {
            state.sex = 'male';
            state.age = 0;
            state.weight = 0;
            state.vegetarian = false;
            state.vegan = false;
            state.glutenFree = false;
            state.dairyFree = false;
            state.healthGoal = 'maintain';
        }
    }
});

export const { updateProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
