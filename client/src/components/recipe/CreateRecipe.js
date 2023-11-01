import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPrompt from "../LoginPrompt";

function CreateRecipe() {
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth.id);
    const attributes = useSelector(state => state.attributes);

    const [createRecipe, setCreateRecipe] = useState({
        name: '',
        image: '',
        cuisines: {
            checkboxes: [],
            inputs: []
        },
        types: {
            checkboxes: [],
            inputs: []
        },
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        servings: 0,
        ingredients: [],
        instructions: []
    });
    const [errors, setErrors] = useState([]);

    function updateCreateRecipe(e) {
        setCreateRecipe({
            ...createRecipe, 
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
        });
    }

    function updateCreateRecipeCheckboxes(e) {
        const { name, value, checked } = e.target;
    
        setCreateRecipe({
            ...createRecipe,
            [name]: {
                ...createRecipe[name],
                checkboxes: checked
                    ? [...createRecipe[name].checkboxes, value]
                    : createRecipe[name].checkboxes.filter(item => item !== value),
            },
        });
    }

    function updateCreateRecipeInputs(attribute, value, index) {
        if (attribute === 'cuisines' || attribute === 'types') {
            const updatedAttributes = [...createRecipe[attribute].inputs];
            updatedAttributes[index] = value;
            setCreateRecipe({ 
                ...createRecipe,
                [attribute]: {
                    ...createRecipe[attribute],
                    inputs: updatedAttributes
                }
            });
        } else {
            const updateAttributes = [...createRecipe[attribute]];
            updateAttributes[index] = value;
            setCreateRecipe({
                ...createRecipe,
                [attribute]: updateAttributes
            });
        }
    }

    function addInput(attribute) {
        if (attribute === 'cuisines' || attribute === 'types') {
            setCreateRecipe({
                ...createRecipe,
                [attribute]: {
                    ...createRecipe[attribute],
                    inputs: [...createRecipe[attribute].inputs, '']
                }
            });
        } else {
            setCreateRecipe({
                ...createRecipe,
                [attribute]: [...createRecipe[attribute], '']
            });
        }
    }

    function removeInput(attribute, index) {
        if (attribute === 'cuisines' || attribute === 'types') {
            setCreateRecipe({
                ...createRecipe,
                [attribute]: {
                    ...createRecipe[attribute],
                    inputs: createRecipe[attribute].inputs.filter((_, i) => i !== index)
                }
            });
        } else {
            setCreateRecipe({
                ...createRecipe,
                [attribute]: createRecipe[attribute].filter((_, i) => i !== index)
            });
        }
    }

    function submitCreateRecipe(e) {
        e.preventDefault();

        const requestBody = {
            recipe: {
                name: createRecipe.name,
                image: createRecipe.image,
                cuisines: createRecipe.cuisines.checkboxes.concat(createRecipe.cuisines.inputs),
                types: createRecipe.types.checkboxes.concat(createRecipe.types.inputs),
                is_vegetarian: createRecipe.isVegetarian,
                is_vegan: createRecipe.isVegan,
                is_gluten_free: createRecipe.isGlutenFree,
                is_dairy_free: createRecipe.isDairyFree,
                calories: createRecipe.calories,
                proteins: createRecipe.proteins,
                carbs: createRecipe.carbs,
                fats: createRecipe.fats,
                servings: createRecipe.servings,
                ingredients: createRecipe.ingredients,
                instructions: createRecipe.instructions
            }
        }

        fetch('/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(recipeData => {
                    navigate(`/recipes/${recipeData.id}`);
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
            <h1>Create Recipe</h1>
            <form onSubmit={submitCreateRecipe}>
                <label htmlFor='add-name'>Name:</label>
                <input 
                    id='add-name'
                    name='name'
                    value={createRecipe.name}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-image'>Image URL:</label>
                <input 
                    id='add-image'
                    name='image'
                    value={createRecipe.image}
                    onChange={updateCreateRecipe}
                />
                <label>Cuisines:</label>
                {attributes.cuisines.map((cuisine, index) => (
                    <div key={index}>
                        <input 
                            id={`add-${cuisine}-cuisine`}
                            name='cuisines'
                            type='checkbox'
                            checked={createRecipe.cuisines.checkboxes.includes(cuisine)}
                            value={cuisine}
                            onChange={updateCreateRecipeCheckboxes}
                        />
                        <label htmlFor={`add-${cuisine}-cuisine`}>{cuisine}</label>
                    </div>
                ))}
                {createRecipe.cuisines.inputs.map((cuisine, index) => (
                    <div key={index}>
                        <input 
                            value={cuisine}
                            onChange={e => updateCreateRecipeInputs('cuisines', e.target.value, index)}
                            placeholder='New cuisine'
                        />
                        <button type='button' onClick={() => removeInput('cuisines', index)}>Delete</button>
                    </div>
                ))}
                <button type='button' onClick={() => addInput('cuisines')}>Enter new cuisine</button>
                <label htmlFor='add-types'>Types:</label>
                {attributes.types.map((type, index) => (
                    <div key={index}>
                        <input 
                            id={`add-${type}-type`}
                            name='types'
                            type='checkbox'
                            checked={createRecipe.types.checkboxes.includes(type)}
                            value={type}
                            onChange={updateCreateRecipeCheckboxes}
                        />
                        <label htmlFor={`add-${type}-cuisine`}>{type}</label>
                    </div>
                ))}
                {createRecipe.types.inputs.map((type, index) => (
                    <div key={index}>
                        <input 
                            value={type}
                            onChange={e => updateCreateRecipeInputs('types', e.target.value, index)}
                            placeholder='New type'
                        />
                        <button type='button' onClick={() => removeInput('types', index)}>Delete</button>
                    </div>
                ))}
                <button type='button' onClick={() => addInput('types')}>Enter new type</button>
                <label htmlFor='add-is-vegetarian'>Vegetarian:</label>
                <input
                    type="checkbox"
                    id='add-is-vegetarian'
                    name='isVegetarian'
                    checked={createRecipe.isVegetarian === true}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-is-vegan'>Vegan:</label>
                <input
                    type="checkbox"
                    id='add-is-vegan'
                    name='isVegan'
                    checked={createRecipe.isVegan === true}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-is-gluten-free'>Gluten free:</label>
                <input
                    type="checkbox"
                    id='add-is-gluten-free'
                    name='isGlutenFree'
                    checked={createRecipe.isGlutenFree === true}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-is-dairy-free'>Dairy free:</label>
                <input
                    type="checkbox"
                    id='add-is-dairy-free'
                    name='isDairyFree'
                    checked={createRecipe.isDairyFree === true}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-calories'>Calories:</label>
                <input 
                    id='add-calories' 
                    name='calories'
                    value={createRecipe.calories}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-proteins'>Proteins (g):</label>
                <input 
                    id='add-proteins' 
                    name='proteins'
                    value={createRecipe.proteins}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-carbs'>Carbs (g):</label>
                <input 
                    id='add-carbs' 
                    name='carbs'
                    value={createRecipe.carbs}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-fats'>Fats (g):</label>
                <input 
                    id='add-fats' 
                    name='fats'
                    value={createRecipe.fats}
                    onChange={updateCreateRecipe}
                />
                <label htmlFor='add-servings'>Servings:</label>
                <input 
                    id='add-servings' 
                    name='servings'
                    value={createRecipe.servings}
                    onChange={updateCreateRecipe}
                />
                <label>Ingredients (amount unit name):</label>
                {createRecipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input 
                            value={ingredient}
                            onChange={e => updateCreateRecipeInputs('ingredients', e.target.value, index)}
                            placeholder='New ingredient'
                        />
                        <button type='button' onClick={() => removeInput('ingredients', index)}>Delete</button>
                    </div>
                ))}
                <button type='button' onClick={() => addInput('ingredients')}>Enter new ingredient</button>
                <label>Instructions:</label>
                {createRecipe.instructions.map((instruction, index) => (
                    <div key={index}>
                        <input 
                            value={instruction}
                            onChange={e => updateCreateRecipeInputs('instructions', e.target.value, index)}
                            placeholder='New step'
                        />
                        <button type='button' onClick={() => removeInput('instructions', index)}>Delete</button>
                    </div>
                ))}
                <button type='button' onClick={() => addInput('instructions')}>Enter new step</button>
                <button>Submit Recipe</button>
            </form>
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
        </div>
    );
}

export default CreateRecipe;
