import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Recipe({ recipe }) {
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    const isRecipeInUserRecipes = () => {
        const userRecipe = userRecipes.find(userRecipe => userRecipe.recipe.id === recipe.id);

        return userRecipe ? `/my-recipes/${userRecipe.id}` : `/recipes/${recipe.id}`;
    }

    return (
        <div className='recipe'>
            <Link id='recipe-link' to={isRecipeInUserRecipes()}>
                <h3>{recipe.name}</h3>
                <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    width='300px'
                />
            </Link>
            <div className='recipe-macros'>
                <p><b>{recipe.calories} calories</b></p>
                <p>{recipe.proteins} g protein</p>
                <p>{recipe.carbs} g carbs</p>
                <p>{recipe.fats} g fat</p>
            </div>
        </div>
    );
}

export default Recipe;
