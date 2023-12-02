import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";

function ShowRecipe() {
    const navigate = useNavigate();
    const { id: recipeId } = useParams();
    const userId = useSelector(state => state.auth.id);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);
    const userRecipe = userRecipes.find(userRecipe => userRecipe.recipe.id === parseInt(recipeId));

    const [recipe, setRecipe] = useState('');

    useEffect(() => {
        fetch(`/recipes/${recipeId}`)
        .then(res => res.json())
        .then(recipeData => setRecipe(recipeData))
        .catch(error => console.error(error));
    }, [recipeId]);

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }

    return (
        <div id='show-recipe'>
            <h1><i>{recipe.name}</i></h1>
            <div id='show-recipe-header'>
                <div>
                    <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        width='300px'
                    />
                    {!userRecipe && <button onClick={() => navigate('/my-recipes/create', { state: recipe })}>Add to My Recipes</button>}
                </div>
                <div>
                    <p><b>{recipe.calories} calories</b></p>
                    <p>{recipe.proteins} g protein</p>
                    <p>{recipe.carbs} g carbs</p>
                    <p>{recipe.fats} g fat</p>
                    {recipe.is_vegetarian && <p><b>Vegetarian</b></p>}
                    {recipe.is_vegan && <p><b>Vegan</b></p>}
                    {recipe.is_gluten_free && <p><b>Gluten Free</b></p>}
                    {recipe.is_dairy_free && <p><b>Dairy Free</b></p>}
                </div>
            </div>
            <div>
                <h3>{recipe.servings} Servings</h3>
                <h3>Ingredients:</h3>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                ))}
            </div>
            <div>
                <h3>Instructions:</h3>
                {recipe.instructions && recipe.instructions.map((step, index) => (
                    <p key={index}>{index + 1}. {step}</p>
                ))}
            </div>
        </div>
    );
}

export default ShowRecipe;
