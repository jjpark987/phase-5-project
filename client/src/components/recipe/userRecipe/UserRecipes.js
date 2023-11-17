import React from "react";
import { useSelector } from "react-redux";
import LoginPrompt from "../../LoginPrompt";
import Recipe from "../Recipe";

function UserRecipes() {
    const userId = useSelector(state => state.auth.id);
    const { userRecipes } = useSelector(state => state.userRecipes);

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
            {userRecipes
            .map(userRecipe => (
                <Recipe key={userRecipe.id} recipe={userRecipe.recipe} />
            ))}
        </div>
    );
}

export default UserRecipes;
