import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRecipes } from "../../slices/userRecipesSlice";

function UserRecipe({ userRecipe }) {
    const dispatch = useDispatch();
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    const [isFavorite, setIsFavorite] = useState(userRecipe.is_favorite);

    function updateIsFavorite() {
        const requestBody = {
            ...userRecipe,
            is_favorite: !isFavorite
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
            setIsFavorite(userRecipeData.is_favorite);
            dispatch(updateUserRecipes(updatedUserRecipes));
        })
        .catch(error => console.error(error));
    }

    return (
        <div className='recipe'>
            <div id='user-recipe-info'>
                {userRecipe && (
                    isFavorite ?  
                    <h3 id='user-recipe-favorite' onClick={updateIsFavorite}>★</h3> : 
                    <h3 id='user-recipe-favorite' onClick={updateIsFavorite} >☆</h3>
                )}
                <Link to={`/my-recipes/${userRecipe.id}`}>
                    <h3 id='user-recipe-title'>{userRecipe.recipe.name}</h3>
                    <img id='user-recipe-img' src={userRecipe.recipe.image} alt={userRecipe.recipe.name} />
                </Link>
            </div>
            <div className='recipe-macros'>
                <p><b>{userRecipe.recipe.calories} calories</b></p>
                <p>{userRecipe.recipe.proteins} g protein</p>
                <p>{userRecipe.recipe.carbs} g carbs</p>
                <p>{userRecipe.recipe.fats} g fat</p>
            </div>
        </div>
    );
}

export default UserRecipe;
