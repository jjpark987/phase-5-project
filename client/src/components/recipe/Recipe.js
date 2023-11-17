import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRecipes } from "../../slices/userRecipesSlice";

function Recipe({ recipe }) {
    const dispatch = useDispatch();
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);
    const userRecipe = userRecipes.find(userRecipe => userRecipe.recipe.id === parseInt(recipe.id));

    const [isFavorite, setIsFavorite] = useState(userRecipe && userRecipe.is_favorite);

    function updateIsFavorite() {
        const requestBody = {
            ...userRecipe,
            is_favorite: !isFavorite
        }

        fetch(`/user_recipes/${userRecipe.id}`, {
            method: 'PATCH',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
        .then(res => res.json())
        .then(userRecipeData => {
            const updatedUserRecipes = userRecipes.map(userRecipe => {
                if (userRecipe.id === userRecipeData.id) {
                    return { ...userRecipeData }
                }
            });
            dispatch(updateUserRecipes(updatedUserRecipes));
            setIsFavorite(userRecipeData.is_favorite);
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            {userRecipe && (
                isFavorite ?  
                <h3 onClick={updateIsFavorite}>★</h3> : 
                <h3 onClick={updateIsFavorite} >☆</h3>
            )}
            <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.name}</h3>
                <img src={recipe.image} alt={recipe.name} />
            </Link>
            <div>
                <p>{recipe.calories} calories</p>
                <p>{recipe.proteins}g protein</p>
                <p>{recipe.carbs}g carbs</p>
                <p>{recipe.fats}g fat</p>
            </div>
        </div>
    );
}

export default Recipe;
