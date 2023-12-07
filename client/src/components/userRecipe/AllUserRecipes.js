import React from "react";
import { useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";
import UserRecipe from "./UserRecipe";

function AllUserRecipes() {
    const userId = useSelector(state => state.auth.id);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    if (!userId) {
        return (
            <LoginPrompt />
        );
    } else if (!userRecipes.length) {
        return (
            <div id='no-user-recipes'>
                <h1>Please select recipes from All Recipes</h1>
                <img 
                    src='foods.jpg'
                    alt='selet_recipes'
                />
            </div>
        );
    }

    return (
        <div id='all-user-recipes'>
            <div id='all-user-recipes-header'>
                <h1><i><u>My Recipes</u></i></h1>
                <i>Star your favorite recipes!</i>
            </div>
            <div id='all-user-recipes-container'>
                {[ ...userRecipes ]
                .sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0))
                .map(userRecipe => (
                    <UserRecipe key={userRecipe.id} userRecipe={userRecipe} />
                ))}
            </div>
        </div>
    );
}

export default AllUserRecipes;
