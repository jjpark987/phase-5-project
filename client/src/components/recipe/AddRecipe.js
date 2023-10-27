import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddRecipe() {
    const navigate = useNavigate();

    const attributes = useSelector(state => state.attributes);

    const [addRecipe, setAddRecipe] = useState({
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

    function updateAddRecipe(e) {
        setAddRecipe({
            ...addRecipe, 
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
        });
    }

    function updateAddRecipeCheckboxes(e) {
        const { name, value, checked } = e.target;
    
        setAddRecipe({
            ...addRecipe,
            [name]: {
                ...addRecipe[name],
                checkboxes: checked
                    ? [...addRecipe[name].checkboxes, value]
                    : addRecipe[name].checkboxes.filter(item => item !== value),
            },
        });
    }

    function updateAddRecipeInputs(attribute, value, index) {
        if (attribute === 'cuisines' || attribute === 'types') {
            const updatedAttributes = [...addRecipe[attribute].inputs];
            updatedAttributes[index] = value;
            setAddRecipe({ 
                ...addRecipe,
                [attribute]: {
                    ...addRecipe[attribute],
                    inputs: updatedAttributes
                }
            });
        } else {
            const updateAttributes = [...addRecipe[attribute]];
            updateAttributes[index] = value;
            setAddRecipe({
                ...addRecipe,
                [attribute]: updateAttributes
            });
        }
    }

    function addInput(attribute) {
        if (attribute === 'cuisines' || attribute === 'types') {
            setAddRecipe({
                ...addRecipe,
                [attribute]: {
                    ...addRecipe[attribute],
                    inputs: [...addRecipe[attribute].inputs, '']
                }
            });
        } else {
            setAddRecipe({
                ...addRecipe,
                [attribute]: [...addRecipe[attribute], '']
            });
        }
    }

    function removeInput(attribute, index) {
        if (attribute === 'cuisines' || attribute === 'types') {
            setAddRecipe({
                ...addRecipe,
                [attribute]: {
                    ...addRecipe[attribute],
                    inputs: addRecipe[attribute].inputs.filter((_, i) => i !== index)
                }
            });
        } else {
            setAddRecipe({
                ...addRecipe,
                [attribute]: addRecipe[attribute].filter((_, i) => i !== index)
            });
        }
    }

    function submitAddRecipe(e) {
        e.preventDefault();

        const requestBody = {
            recipe: {
                name: addRecipe.name,
                image: addRecipe.image,
                cuisines: addRecipe.cuisines.checkboxes.concat(addRecipe.cuisines.inputs),
                types: addRecipe.types.checkboxes.concat(addRecipe.types.inputs),
                is_vegetarian: addRecipe.isVegetarian,
                is_vegan: addRecipe.isVegan,
                is_gluten_free: addRecipe.isGlutenFree,
                is_dairy_free: addRecipe.isDairyFree,
                calories: addRecipe.calories,
                proteins: addRecipe.proteins,
                carbs: addRecipe.carbs,
                fats: addRecipe.fats,
                servings: addRecipe.servings,
                ingredients: addRecipe.ingredients,
                instructions: addRecipe.instructions
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

    return (
        <div>
            <h1>Create Recipe</h1>
            <form onSubmit={submitAddRecipe}>
                <label htmlFor='add-name'>Name:</label>
                <input 
                    id='add-name'
                    name='name'
                    value={addRecipe.name}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-image'>Image URL:</label>
                <input 
                    id='add-image'
                    name='image'
                    value={addRecipe.image}
                    onChange={updateAddRecipe}
                />
                <label>Cuisines:</label>
                {attributes.cuisines.map((cuisine, index) => (
                    <div key={index}>
                        <input 
                            id={`add-${cuisine}-cuisine`}
                            name='cuisines'
                            type='checkbox'
                            checked={addRecipe.cuisines.checkboxes.includes(cuisine)}
                            value={cuisine}
                            onChange={updateAddRecipeCheckboxes}
                        />
                        <label htmlFor={`add-${cuisine}-cuisine`}>{cuisine}</label>
                    </div>
                ))}
                {addRecipe.cuisines.inputs.map((cuisine, index) => (
                    <div key={index}>
                        <input 
                            value={cuisine}
                            onChange={e => updateAddRecipeInputs('cuisines', e.target.value, index)}
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
                            checked={addRecipe.types.checkboxes.includes(type)}
                            value={type}
                            onChange={updateAddRecipeCheckboxes}
                        />
                        <label htmlFor={`add-${type}-cuisine`}>{type}</label>
                    </div>
                ))}
                {addRecipe.types.inputs.map((type, index) => (
                    <div key={index}>
                        <input 
                            value={type}
                            onChange={e => updateAddRecipeInputs('types', e.target.value, index)}
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
                    checked={addRecipe.isVegetarian === true}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-is-vegan'>Vegan:</label>
                <input
                    type="checkbox"
                    id='add-is-vegan'
                    name='isVegan'
                    checked={addRecipe.isVegan === true}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-is-gluten-free'>Gluten free:</label>
                <input
                    type="checkbox"
                    id='add-is-gluten-free'
                    name='isGlutenFree'
                    checked={addRecipe.isGlutenFree === true}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-is-dairy-free'>Dairy free:</label>
                <input
                    type="checkbox"
                    id='add-is-dairy-free'
                    name='isDairyFree'
                    checked={addRecipe.isDairyFree === true}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-calories'>Calories:</label>
                <input 
                    id='add-calories' 
                    name='calories'
                    value={addRecipe.calories}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-proteins'>Proteins (g):</label>
                <input 
                    id='add-proteins' 
                    name='proteins'
                    value={addRecipe.proteins}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-carbs'>Carbs (g):</label>
                <input 
                    id='add-carbs' 
                    name='carbs'
                    value={addRecipe.carbs}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-fats'>Fats (g):</label>
                <input 
                    id='add-fats' 
                    name='fats'
                    value={addRecipe.fats}
                    onChange={updateAddRecipe}
                />
                <label htmlFor='add-servings'>Servings:</label>
                <input 
                    id='add-servings' 
                    name='servings'
                    value={addRecipe.servings}
                    onChange={updateAddRecipe}
                />
                <label>Ingredients (amount unit name):</label>
                {addRecipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input 
                            value={ingredient}
                            onChange={e => updateAddRecipeInputs('ingredients', e.target.value, index)}
                            placeholder='New ingredient'
                        />
                        <button type='button' onClick={() => removeInput('ingredients', index)}>Delete</button>
                    </div>
                ))}
                <button type='button' onClick={() => addInput('ingredients')}>Enter new ingredient</button>
                <label>Instructions:</label>
                {addRecipe.instructions.map((instruction, index) => (
                    <div key={index}>
                        <input 
                            value={instruction}
                            onChange={e => updateAddRecipeInputs('instructions', e.target.value, index)}
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

export default AddRecipe;
