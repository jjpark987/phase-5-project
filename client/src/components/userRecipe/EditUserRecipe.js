import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";
import { updateUserRecipes } from "../../slices/userRecipesSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditUserRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    function updateComments(e) {
        setUserRecipe({ ...userRecipe, comments: e.target.value });
    }

    function submitUserRecipe(e) {
        e.preventDefault();

        fetch(`/user_recipes/${userRecipe.id}`, {
            method: 'PATCH',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify(userRecipe)
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
            navigate(`/my-recipes/${userRecipe.id}`);
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
            {userRecipe.recipe && (
                <div className='show-recipe'>
                    <h1><i>{userRecipe.recipe.name}</i></h1>
                    <div className='show-recipe-header'>
                        <img 
                            src={userRecipe.recipe.image} 
                            alt={userRecipe.recipe.name} 
                            width='300px'
                        />
                        <div>
                            <p><b>{userRecipe.recipe.calories} calories</b></p>
                            <p>{userRecipe.recipe.proteins} g protein</p>
                            <p>{userRecipe.recipe.carbs} g carbs</p>
                            <p>{userRecipe.recipe.fats} g fat</p>
                        </div>
                        <div>
                            {userRecipe.recipe.is_vegetarian && <p><b>Vegetarian</b></p>}
                            {userRecipe.recipe.is_vegan && <p><b>Vegan</b></p>}
                            {userRecipe.recipe.is_gluten_free && <p><b>Gluten free</b></p>}
                            {userRecipe.recipe.is_dairy_free && <p><b>Dairy free</b></p>}
                        </div>
                    </div>
                    <div>
                        <form className='comments' onSubmit={submitUserRecipe}>
                            <p><i><b>Comments:</b></i></p>
                            <textarea
                                value={userRecipe.comments}
                                onChange={updateComments}
                            />
                            <button className='comments-btn'>SUBMIT</button>
                        </form>
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
                </div>
            )}
        </div>
    );
}

export default EditUserRecipe;
