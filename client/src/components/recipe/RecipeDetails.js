import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";

function RecipeDetails() {
    const navigate = useNavigate();
    const recipeId = useParams();

    const userId = useSelector(state => state.auth.id);

    const [recipe, setRecipe] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        fetch(`/recipes/${recipeId.id}`)
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(recipeData => setRecipe(recipeData));
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }, [recipeId.id]);

    function deleteRecipe() {
        fetch(`/recipes/${recipeId.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                navigate('/recipes');
            } else {
                res.json().then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }

    if (!userId) {
        return (
            <LoginPrompt />
        );
    } else if (errors.error) {
        return (
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
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
            <button onClick={deleteRecipe}>Delete recipe</button>
        </div>
    );
}

export default RecipeDetails;
