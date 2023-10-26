import React, { useState } from "react";
import { useSelector } from "react-redux";

function AddRecipe() {
    const attributes = useSelector(state => state.attributes);

    const [addRecipe, setAddRecipe] = useState({
        name: '',
        image: '',
        cuisines: [],
        types: [],
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
    const [newAttribute, setNewAttribute] = useState({
        cuisine: '',
        type: '',
        ingredient: ''
    });

    function updateAddRecipe(e) {
        setAddRecipe({ ...addRecipe, [e.target.name]: e.target.value });
    }

    function updateNewAttribute(e) {
        setNewAttribute({ ...newAttribute, [e.target.name]: e.target.value });
    }

    function updateAddRecipeAttributes(e) {
        const { name, value, checked } = e.target;

        if (name === 'cuisines') {
            if (checked) {
                setAddRecipe({ ...addRecipe, cuisines: [...addRecipe.cuisines, value] });
            } else {
                setAddRecipe({ ...addRecipe, cuisines: addRecipe.cuisines.filter(cuisine => cuisine !== value) });
            }
        } else {
            if (checked) {
                setAddRecipe({ ...addRecipe, types: [...addRecipe.types, value] });
            } else {
                setAddRecipe({ ...addRecipe, types: addRecipe.types.filter(type => type !== value) });
            }
        }
    }

    function createNewRow() {
        setAddRecipe({ ...addRecipe, ingredients: [...addRecipe.ingredients, newAttribute.ingredient] });
        setNewAttribute({ ...newAttribute, ingredient: '' }); // Clear the input field
    }

    return (
        <div>
            <h1>Create Recipe</h1>
            <form>
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
                <label htmlFor='add-cuisines'>Cuisines:</label>
                <input 
                    id='add-cuisines'
                    name='cuisine'
                    values={newAttribute.cuisine}
                    onChange={updateNewAttribute}
                    placeholder='Add new cuisine'
                />
                {attributes.cuisines.map((cuisine, index) => (
                    <div key={index}>
                        <input 
                            id={`add-${cuisine}-cuisine`}
                            name='cuisines'
                            type='checkbox'
                            checked={addRecipe.cuisines.includes(cuisine)}
                            value={cuisine}
                            onChange={updateAddRecipeAttributes}
                        />
                        <label htmlFor={`add-${cuisine}-cuisine`}>{cuisine}</label>
                    </div>
                ))}
                <label htmlFor='add-types'>Types:</label>
                <input 
                    id='add-types'
                    name='type'
                    values={newAttribute.type}
                    onChange={updateNewAttribute}
                    placeholder='Add new type'
                />
                {attributes.types.map((type, index) => (
                    <div key={index}>
                        <input 
                            id={`add-${type}-type`}
                            name='types'
                            type='checkbox'
                            checked={addRecipe.types.includes(type)}
                            value={type}
                            onChange={updateAddRecipeAttributes}
                        />
                        <label htmlFor={`add-${type}-cuisine`}>{type}</label>
                    </div>
                ))}
                <label htmlFor='add-is-vegetarian'>Vegetarian:</label>
                <select 
                    id='add-is-vegetarian' 
                    name='isVegetarian'
                    value={addRecipe.isVegetarian}
                    onChange={updateAddRecipe}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-is-vegan'>Vegan:</label>
                <select 
                    id='add-is-vegan' 
                    name='isVegan'
                    value={addRecipe.isVegan}
                    onChange={updateAddRecipe}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-is-gluten-free'>Gluten free:</label>
                <select 
                    id='add-is-gluten-free' 
                    name='isGlutenFree'
                    value={addRecipe.isGlutenFree}
                    onChange={updateAddRecipe}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-is-dairy-free'>Dairy free:</label>
                <select 
                    id='add-is-dairy-free' 
                    name='isDairyFree'
                    value={addRecipe.isDairyFree}
                    onChange={updateAddRecipe}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
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
                <label htmlFor='add-ingredients'>Ingredients (amount unit name):</label>
                <input 
                    id='add-ingredients'
                    value={newAttribute.ingredient}
                    onChange={e => setNewAttribute({ ...newAttribute, ingredient: e.target.value })}
                    placeholder='0.5 tablespoons olive oil'
                />
                <button type='button' onClick={createNewRow}>Add row</button>
                <div>
                    {/* Display existing ingredients */}
                    {addRecipe.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                    ))}
                </div>
                <button>Submit Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe;
