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
            <h1>Please select recipes from All Recipes</h1>
        );
    }

    return (
        <div>
            <h1>My Recipes</h1>
            {[ ...userRecipes ]
            .sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0))
            .map(userRecipe => (
                <UserRecipe key={userRecipe.id} userRecipe={userRecipe} />
            ))}
        </div>
    );
}

export default AllUserRecipes;
