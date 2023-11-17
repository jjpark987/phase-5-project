import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRecipes } from "../../slices/userRecipesSlice";
import { updateRecipe } from "../../slices/recipeSlice";
import LoginPrompt from "../LoginPrompt";

function RecipeDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: recipeId } = useParams();
    const userId = useSelector(state => state.auth.id);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);
    const userRecipe = userRecipes.find(userRecipe => userRecipe.recipe.id === parseInt(recipeId));

    const [recipe, setRecipe] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        fetch(`/recipes/${recipeId}`)
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(recipeData => setRecipe(recipeData));
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }, [recipeId]);

    function deleteUserRecipe() {
        fetch(`/user_recipes/${userRecipe.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedUserRecipes = userRecipes.filter(userRecipe => userRecipe.recipe.id !== recipe.id);

            dispatch(updateUserRecipes(updatedUserRecipes));
            navigate('/my-recipes');
        })
        .catch(error => console.error(error));
    }

    function createUserRecipe() {
        dispatch(updateRecipe(recipe));
        navigate('/my-recipes/create');
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
            {userRecipe ?
            <button onClick={deleteUserRecipe}>Remove from My Recipes</button> :
            <button onClick={createUserRecipe}>Add to My Recipes</button>}
        </div>
    );
}

export default RecipeDetails;
