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
                <div>
                    <h3>{userRecipe.recipe.name}</h3>
                    <img src={userRecipe.recipe.image} alt={userRecipe.recipe.name} />
                    <div>
                        <p>Comments: {userRecipe.comments ? userRecipe.comments : 'None'}</p>
                        <button onClick={() => editUserRecipe()}>Edit comments</button>
                    </div>
                    <div>
                        <p>{userRecipe.recipe.calories} calories</p>
                        <p>{userRecipe.recipe.proteins}g protein</p>
                        <p>{userRecipe.recipe.carbs}g carbs</p>
                        <p>{userRecipe.recipe.fats}g fat</p>
                    </div>
                    <div>
                        {userRecipe.recipe.is_vegetarian && <p>Vegetarian</p>}
                        {userRecipe.recipe.is_vegan && <p>Vegan</p>}
                        {userRecipe.recipe.is_gluten_free && <p>Gluten Free</p>}
                        {userRecipe.recipe.is_dairy_free && <p>Dairy Free</p>}
                    </div>
                    <div>
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
                    <button onClick={() => deleteUserRecipe()}>Remove from My Recipes</button>
                </div>
            )}
        </div>
    );    
}

export default ShowUserRecipe;
