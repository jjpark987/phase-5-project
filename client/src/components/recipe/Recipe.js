import React from "react";
import { Link } from "react-router-dom";

function Recipe({ recipe }) {
    return (
        <div id='recipe'>
            <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.name}</h3>
                <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    width='300px'
                />
            </Link>
            <div id='recipe-macros'>
                <p><b>{recipe.calories} calories</b></p>
                <p>{recipe.proteins} g protein</p>
                <p>{recipe.carbs} g carbs</p>
                <p>{recipe.fats} g fat</p>
            </div>
        </div>
    );
}

export default Recipe;
