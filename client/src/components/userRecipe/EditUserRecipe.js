import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";
import { updateUserRecipes } from "../../slices/userRecipesSlice";
import { useNavigate } from "react-router-dom";

function EditUserRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth.id);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);
    const recipe = useSelector(state => state.recipe);
    const userRecipe = userRecipes.find(userRecipe => userRecipe.recipe.id === parseInt(recipe.id));

    const [comments, setComments] = useState(userRecipe ? userRecipe.comments : '');

    function updateComments(e) {
        setComments(e.target.value);
    }

    function submitUserRecipe(e) {
        e.preventDefault();

        const requestBody = {
            ...userRecipe,
            comments: comments
        };

        fetch(`/user_recipes/${userRecipe.id}`, {
            method: 'PATCH',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
        .then(res => res.json())
        .then(userRecipeData => {
            const updatedUserRecipes = userRecipes.map(userRecipeElement => {
                if (userRecipeElement.id === userRecipeData.id) {
                    return { ...userRecipeData };
                } else {
                    return { ...userRecipeElement };
                };
            });
            dispatch(updateUserRecipes(updatedUserRecipes));
            navigate(`/recipes/${recipe.id}`);
        })
        .catch(error => console.error(error));
    }

    if (!userId) {
        return (
            <LoginPrompt />
        );
    } else if (recipe.id === 0) {
        navigate(`/recipes/${recipe.id}`);
    }

    return (
        <div>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
            <form onSubmit={submitUserRecipe}>
                <textarea 
                    value={comments}
                    onChange={updateComments}
                />
                <button>Submit</button>
            </form>
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
        </div>
    );
}

export default EditUserRecipe;
