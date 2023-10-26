import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../reducers/profileSlice";

function AddProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const [addProfile, setAddProfile] = useState({
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

    function updateAddProfile(e) {
        setAddProfile({
            ...addProfile, 
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
        });
    }

    function submitAddProfile(e) {
        e.preventDefault();

        const requestBody = {
            profile: {
                user_id: user.id,
                sex: addProfile.sex,
                age: addProfile.age,
                height: parseInt(addProfile.heightFeet) * 12 + parseInt(addProfile.heightInches),
                weight: addProfile.weight,
                activity_level: addProfile.activityLevel, 
                health_goal: addProfile.healthGoal,
                vegetarian: addProfile.vegetarian,
                vegan: addProfile.vegan,
                gluten_free: addProfile.glutenFree,
                dairy_free: addProfile.dairyFree,
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

    return (
        <div>
            <h1>Create Your Profile</h1>
            <form onSubmit={submitAddProfile}>
                <label htmlFor='add-sex'>Sex:</label>
                <select 
                    id='add-sex' 
                    name='sex'
                    value={addProfile.sex}
                    onChange={updateAddProfile}
                >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <label htmlFor='add-age'>Age:</label>
                <input 
                    id='add-age' 
                    name='age'
                    value={addProfile.age}
                    onChange={updateAddProfile}
                />
                <label htmlFor='add-height-feet'>Height (ft, in):</label>
                <input 
                    id='add-height-feet' 
                    name='heightFeet'
                    value={addProfile.heightFeet}
                    onChange={updateAddProfile}
                />
                <input 
                    id='add-height-inches' 
                    name='heightInches'
                    value={addProfile.heightInches}
                    onChange={updateAddProfile}
                />
                <label htmlFor='add-weight'>Weight (lbs):</label>
                <input 
                    id='add-weight' 
                    name='weight'
                    value={addProfile.weight}
                    onChange={updateAddProfile}
                />
                <label htmlFor='add-activity-level'>Activity level:</label>
                <select 
                    id='add-activity-level' 
                    name='activityLevel'
                    value={addProfile.activityLevel}
                    onChange={updateAddProfile}
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
                    value={addProfile.healthGoal}
                    onChange={updateAddProfile}
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
                    checked={addProfile.vegetarian}
                    onChange={updateAddProfile}
                />

                <label htmlFor='add-vegan'>Vegan:</label>
                <input 
                    id='add-vegan' 
                    type='checkbox' 
                    name='vegan'
                    checked={addProfile.vegan}
                    onChange={updateAddProfile}
                />

                <label htmlFor='add-gluten-free'>Gluten free:</label>
                <input 
                    id='add-gluten-free' 
                    type='checkbox' 
                    name='glutenFree'
                    checked={addProfile.glutenFree}
                    onChange={updateAddProfile}
                />

                <label htmlFor='add-dairy-free'>Dairy free:</label>
                <input 
                    id='add-dairy-free' 
                    type='checkbox' 
                    name='dairyFree'
                    checked={addProfile.dairyFree}
                    onChange={updateAddProfile}
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

export default AddProfile;
