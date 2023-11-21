import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRecipes } from "../../slices/userRecipesSlice";
import LoginPrompt from "../LoginPrompt";

function CreateUserRecipe() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const recipe = useSelector(state => state.recipe);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    const [comments, setComments] = useState('');
    const [errors, setErrors] = useState([]);

    function updateComments(e) {
        setComments(e.target.value);
    }

    function submitUserRecipe(e) {
        e.preventDefault();
        
        const requestBody = {
            recipe_id: recipe.id,
            comments: comments,
            is_favorite: false
        };

        fetch('/user_recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(userRecipeData => {
                    const updatedUserRecipes = [...userRecipes, userRecipeData];

                    dispatch(updateUserRecipes(updatedUserRecipes));
                    navigate('/my-recipes');
                });
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }

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
            <form onSubmit={submitUserRecipe}>
                <textarea 
                    value={comments}
                    onChange={updateComments}
                    placeholder='Add comments here'
                />
                <button>Submit</button>
            </form>
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
        </div>
    );
}

export default CreateUserRecipe;