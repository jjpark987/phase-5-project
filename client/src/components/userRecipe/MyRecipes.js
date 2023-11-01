import React from "react";
import { useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";

function MyRecipes() {
    const userId = useSelector(state => state.auth.id);

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }
    
    return (
        <div>
            My Recipes
        </div>
    );
}

export default MyRecipes;
