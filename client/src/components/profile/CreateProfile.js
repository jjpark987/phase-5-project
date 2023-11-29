import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../slices/profileSlice";
import LoginPrompt from "../LoginPrompt";

function CreateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);

    const [createProfile, setCreateProfile] = useState({
        sex: 'male',
        age: '',
        heightFeet: '',
        heightInches: '',
        weight: '',
        activityLevel: 'sedentary',
        healthGoal: 'maintain',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false
    });
    const [errors, setErrors] = useState([]);

    function updateCreateProfile(e) {
        setCreateProfile({
            ...createProfile, 
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
        });
    }

    function submitCreateProfile(e) {
        e.preventDefault();

        const requestBody = {
            profile: {
                sex: createProfile.sex,
                age: createProfile.age,
                height: parseInt(createProfile.heightFeet) * 12 + parseInt(createProfile.heightInches),
                weight: createProfile.weight,
                activity_level: createProfile.activityLevel, 
                health_goal: createProfile.healthGoal,
                vegetarian: createProfile.vegetarian,
                vegan: createProfile.vegan,
                gluten_free: createProfile.glutenFree,
                dairy_free: createProfile.dairyFree,
            }
        };

        fetch('/profiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(profileData => {
                    dispatch(updateProfile(profileData));
                    navigate('/profile');
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
            <h1>Create Your Profile</h1>
            <form onSubmit={submitCreateProfile}>
                <label htmlFor='add-sex'>Sex:</label>
                <select 
                    id='add-sex' 
                    name='sex'
                    value={createProfile.sex}
                    onChange={updateCreateProfile}
                >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <label htmlFor='add-age'>Age:</label>
                <input 
                    id='add-age' 
                    name='age'
                    value={createProfile.age}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-height-feet'>Height (ft, in):</label>
                <input 
                    id='add-height-feet' 
                    name='heightFeet'
                    value={createProfile.heightFeet}
                    onChange={updateCreateProfile}
                />
                <input 
                    id='add-height-inches' 
                    name='heightInches'
                    value={createProfile.heightInches}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-weight'>Weight (lbs):</label>
                <input 
                    id='add-weight' 
                    name='weight'
                    value={createProfile.weight}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-activity-level'>Activity level:</label>
                <select 
                    id='add-activity-level' 
                    name='activityLevel'
                    value={createProfile.activityLevel}
                    onChange={updateCreateProfile}
                >
                    <option value='sedentary'>Little to no exercise</option>
                    <option value='light'>Light exercise 1-3 days/week</option>
                    <option value='moderate'>Moderate exercise 3-5 days/week</option>
                    <option value='high'>Hard exercise 6-7 days/week</option>
                    <option value='vigorous'>Very hard exercise everyday with physical job</option>
                </select>
                <label htmlFor='add-health-goal'>Health goal:</label>
                <select 
                    id='add-health-goal' 
                    name='healthGoal'
                    value={createProfile.healthGoal}
                    onChange={updateCreateProfile}
                >
                    <option value='lose'>I want to lose weight</option>
                    <option value='maintain'>I want to maintain my weight</option>
                    <option value='gain'>I want to gain weight</option>
                </select>
                <label htmlFor='add-vegetarian'>Vegetarian:</label>
                <input 
                    id='add-vegetarian' 
                    type='checkbox' 
                    name='vegetarian'
                    checked={createProfile.vegetarian}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-vegan'>Vegan:</label>
                <input 
                    id='add-vegan' 
                    type='checkbox' 
                    name='vegan'
                    checked={createProfile.vegan}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-gluten-free'>Gluten free:</label>
                <input 
                    id='add-gluten-free' 
                    type='checkbox' 
                    name='glutenFree'
                    checked={createProfile.glutenFree}
                    onChange={updateCreateProfile}
                />
                <label htmlFor='add-dairy-free'>Dairy free:</label>
                <input 
                    id='add-dairy-free' 
                    type='checkbox' 
                    name='dairyFree'
                    checked={createProfile.dairyFree}
                    onChange={updateCreateProfile}
                />
                <button>Submit Profile</button>
            </form>
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
        </div>
    );
}

export default CreateProfile;
