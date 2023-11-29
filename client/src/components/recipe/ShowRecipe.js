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
        <div>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
            <div>
                <p>{recipe.calories} calories</p>
                <p>{recipe.proteins}g protein</p>
                <p>{recipe.carbs}g carbs</p>
                <p>{recipe.fats}g fat</p>
            </div>
            <div>
                {recipe.is_vegetarian && <p>Vegetarian</p>}
                {recipe.is_vegan && <p>Vegan</p>}
                {recipe.is_gluten_free && <p>Gluten Free</p>}
                {recipe.is_dairy_free && <p>Dairy Free</p>}
            </div>
            <div>
                <h3>{recipe.servings} Servings</h3>
                <h3>Ingredients:</h3>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                ))}
                <h3>Instructions:</h3>
                {recipe.instructions && recipe.instructions.map((step, index) => (
                    <p key={index}>{index + 1}. {step}</p>
                ))}
            </div>
            {!userRecipe && <button onClick={() => navigate('/my-recipes/create', { state: recipe })}>Add to My Recipes</button>}
        </div>
    );
}

export default ShowRecipe;
