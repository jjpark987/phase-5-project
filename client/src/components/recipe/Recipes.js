import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Recipe from "./Recipe";

function Recipes() {
    const profile = useSelector(state => state.profile);

    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [attributes, setAttributes] = useState({
        cuisines: [],
        types: []
    });
    const [selectedAttribute, setSelectedAttribute] = useState({
        cuisine: '',
        type: ''
    });
    const [sortBy, setSortBy] = useState('');
    const [pageStart, setPageStart] = useState(0);

    useEffect(() => {
        fetch('/recipes')
        .then(res => {
            if (res.ok) {
                res.json().then(recipeData => setRecipes(recipeData));
            }
        })
        .catch(error => console.error(error));

        fetch('/recipes/unique_attributes')
        .then(res => {
            if (res.ok) {
                res.json().then(attributesData => {
                    setAttributes({
                        cuisines: attributesData.cuisines,
                        types: attributesData.types
                    });
                });
            }
        })
        .catch(error => console.error(error));
    }, []);
    
    function filterDietaryRestrictions(recipe) {
        if (profile.vegetarian && !recipe.is_vegetarian) {
            return false;
        } else if (profile.vegan && !recipe.is_vegan) {
            return false;
        } else if (profile.glutenFree && !recipe.is_gluten_free) {
            return false;
        } else if (profile.dairyFree && !recipe.is_dairy_free) {
            return false;
        } else {
            return true;
        }
    }

    function searchRecipes(recipe) {
        return recipe.name.toLowerCase().includes(search.toLowerCase());
    }

    function filterCuisine(recipe) {
        if (recipe.cuisines.includes(selectedAttribute.cuisine.toLowerCase()) || selectedAttribute.cuisine === '') {
            return true;
        }
    }

    function filterType(recipe) {
        if (recipe.types.includes(selectedAttribute.type.toLowerCase()) || selectedAttribute.type === '') {
            return true;
        }
    }

    function sortByNutrient(a, b) {
        if (sortBy === 'calories') {
            return b.calories - a.calories;
        } else if (sortBy === 'proteins') {
            return b.proteins - a.proteins;
        } else if (sortBy === 'carbs') {
            return b.carbs - a.carbs;
        } else if (sortBy === 'fats') {
            return b.fats - a.fats;
        } else {
            return 0;
        }
    }

    return (
        <div>
            <h1>Recipes</h1>
            <div>
                <form>
                    <input
                        placeholder='Search Recipes'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select 
                        value={selectedAttribute.cuisine} 
                        onChange={e => setSelectedAttribute({ ...selectedAttribute, cuisine: e.target.value})}
                    >
                        <option value=''>Filter cuisine</option>
                        {attributes.cuisines.map((cuisine, index) => (
                            <option key={index} value={cuisine}>{cuisine}</option>
                        ))}
                    </select>
                    <select
                        value={selectedAttribute.type} 
                        onChange={e => setSelectedAttribute({ ...selectedAttribute, type: e.target.value})}
                    >
                        <option value=''>Filter type</option>
                        {attributes.types.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value=''>Sort by</option>
                        <option value='calories'>Calories</option>
                        <option value='proteins'>Proteins</option>
                        <option value='carbs'>Carbs</option>
                        <option value='fats'>Fats</option>
                    </select>
                </form>
            </div>
            <div>
                {recipes
                .filter(recipe => filterDietaryRestrictions(recipe))
                .filter(recipe => searchRecipes(recipe))
                .filter(recipe => filterCuisine(recipe))
                .filter(recipe => filterType(recipe))
                .sort(sortByNutrient)
                .slice(pageStart, pageStart + 10)
                .map(recipe => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <div>
                {pageStart !== 0 && 
                    <button onClick={() => setPageStart(pageStart - 10)}>Back</button>
                }
                {pageStart <= recipes
                .filter(recipe => filterDietaryRestrictions(recipe))
                .filter(recipe => searchRecipes(recipe))
                .filter(recipe => filterCuisine(recipe))
                .filter(recipe => filterType(recipe))
                .sort(sortByNutrient)
                .length - 10 && 
                    <button onClick={() => setPageStart(pageStart + 10)}>Next</button>
                }
            </div>
        </div>
    );
}

export default Recipes;