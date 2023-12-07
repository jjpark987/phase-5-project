import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRecipes } from "../../slices/userRecipesSlice";
import LoginPrompt from "../LoginPrompt";

function ShowUserRecipe() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: userRecipeId } = useParams();
    const userId = useSelector(state => state.auth.id);
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    const [userRecipe, setUserRecipe] = useState('');

    useEffect(() => {
        fetch(`/user_recipes/${userRecipeId}`)
        .then(res => res.json())
        .then(userRecipeData => setUserRecipe(userRecipeData))
        .catch(error => console.error(error));
    }, [userRecipeId]);

    function deleteUserRecipe() {
        fetch(`/user_recipes/${userRecipeId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedUserRecipes = userRecipes.filter(userRecipeElement => userRecipeElement.id !== parseInt(userRecipeId));

            dispatch(updateUserRecipes(updatedUserRecipes));
            navigate('/my-recipes');
        })
        .catch(error => console.error(error));
    }

    function editUserRecipe() {
        navigate(`/my-recipes/${userRecipe.id}/edit`);
    }

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }

    return (
        <div>
            {userRecipe.recipe && (
                <div className='show-recipe'>
                    <h1><i>{userRecipe.recipe.name}</i></h1>
                    <div className='show-recipe-header'>
                        <img 
                            src={userRecipe.recipe.image} alt={userRecipe.recipe.name} 
                            width='300px'    
                        />
                        <div>
                            <p><b>{userRecipe.recipe.calories} calories</b></p>
                            <p>{userRecipe.recipe.proteins}g protein</p>
                            <p>{userRecipe.recipe.carbs}g carbs</p>
                            <p>{userRecipe.recipe.fats}g fat</p>
                        </div>
                        <div>
                            {userRecipe.recipe.is_vegetarian && <p><b>Vegetarian</b></p>}
                            {userRecipe.recipe.is_vegan && <p><b>Vegan</b></p>}
                            {userRecipe.recipe.is_gluten_free && <p><b>Gluten free</b></p>}
                            {userRecipe.recipe.is_dairy_free && <p><b>Dairy free</b></p>}
                        </div>
                    </div>
                    <div>
                        <div className='comments'>
                            <p><i><b>Comments:</b></i></p>
                            {userRecipe.comments ? <p id='comments-body'><i>{userRecipe.comments}</i></p> : <p id='comments-none'>🍽️</p>}
                            <button className='comments-btn' onClick={() => editUserRecipe()}>EDIT COMMENTS</button>
                        </div>
                        <h3>{userRecipe.recipe.servings} Servings</h3>
                        <h3>Ingredients:</h3>
                        {userRecipe.recipe.ingredients && userRecipe.recipe.ingredients.map((ingredient, index) => (
                            <p key={index}>{ingredient}</p>
                        ))}
                        <h3>Instructions:</h3>
                        {userRecipe.recipe.instructions && userRecipe.recipe.instructions.map((step, index) => (
                            <p key={index}>{index + 1}. {step}</p>
                        ))}
                    </div>
                    <button id='show-user-recipe-remove-btn' onClick={() => deleteUserRecipe()}>REMOVE FROM MY RECIPES</button>
                </div>
            )}
        </div>
    );    
}

export default ShowUserRecipe;
