import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";
import { updateUserRecipes } from "../../slices/userRecipesSlice";

function CreateUserRecipe() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const userId = useSelector(state => state.auth.id);
    const recipe = location.state;
    const userRecipes = useSelector(state => state.userRecipes.userRecipes);

    const [comments, setComments] = useState('');

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
        .then(res => res.json())
        .then(userRecipeData => {
            const updatedUserRecipes = [...userRecipes, userRecipeData];

            dispatch(updateUserRecipes(updatedUserRecipes));
            navigate('/my-recipes');
        })
        .catch(error => console.error(error));
    }

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }

    return (
        <div className='show-recipe'>
            <h1><i>{recipe.name}</i></h1>
            <div className='show-recipe-header'>
                <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    width='300px'    
                />
                <div>
                    <p><b>{recipe.calories} calories</b></p>
                    <p>{recipe.proteins} g protein</p>
                    <p>{recipe.carbs} g carbs</p>
                    <p>{recipe.fats} g fat</p>
                </div>
                <div>
                    {recipe.is_vegetarian && <p><b>Vegetarian</b></p>}
                    {recipe.is_vegan && <p><b>Vegan</b></p>}
                    {recipe.is_gluten_free && <p><b>Gluten free</b></p>}
                    {recipe.is_dairy_free && <p><b>Dairy free</b></p>}
                </div>
            </div>
            <div>
                <form className='comments' onSubmit={submitUserRecipe}>
                    <p><i><b>Comments:</b></i></p>
                    <textarea 
                        value={comments}
                        onChange={updateComments}
                        placeholder='ADD COMMENTS'
                    />
                    <button className='comments-btn'>SUBMIT</button>
                </form>
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

export default CreateUserRecipe;
