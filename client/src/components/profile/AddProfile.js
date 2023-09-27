import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileCreated } from "../../reducers/authSlice";
import { updateProfile } from "../../reducers/profileSlice";

function AddProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile);

    const [addProfile, setAddProfile] = useState({
        sex: profile.sex,
        age: profile.age,
        weight: profile.weight,
        vegetarian: profile.vegetarian,
        vegan: profile.vegan,
        glutenFree: profile.glutenFree,
        dairyFree: profile.dairyFree,
        healthGoal: profile.healthGoal
    });
    const [errors, setErrors] = useState([]);

    function updateAddProfile(e) {
        setAddProfile({ ...addProfile, [e.target.name]: e.target.value });
    }

    function submitAddProfile(e) {
        e.preventDefault();

        const requestBody = {
            profile: {
                user_id: user.id,
                sex: addProfile.sex,
                age: addProfile.age,
                weight: addProfile.weight,
                vegetarian: addProfile.vegetarian,
                vegan: addProfile.vegan,
                gluten_free: addProfile.glutenFree,
                dairy_free: addProfile.dairyFree,
                health_goal: addProfile.healthGoal
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
                    dispatch(profileCreated());
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
                <label htmlFor='add-weight'>Weight:</label>
                <input 
                    id='add-weight' 
                    name='weight'
                    value={addProfile.weight}
                    onChange={updateAddProfile}
                />
                <label htmlFor='add-vegetarian'>Vegetarian:</label>
                <select 
                    id='add-vegetarian' 
                    name='vegetarian'
                    value={addProfile.vegetarian}
                    onChange={updateAddProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-vegan'>Vegan:</label>
                <select 
                    id='add-vegan' 
                    name='vegan'
                    value={addProfile.vegan}
                    onChange={updateAddProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-gluten-free'>gluten Free:</label>
                <select 
                    id='add-gluten-free' 
                    name='glutenFree'
                    value={addProfile.glutenFree}
                    onChange={updateAddProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-dairy-free'>Dairy Free:</label>
                <select 
                    id='add-dairy-free' 
                    name='dairyFree'
                    value={addProfile.dairyFree}
                    onChange={updateAddProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='add-health-goal'>Health Goal:</label>
                <select 
                    id='add-health-goal' 
                    name='healthGoal'
                    value={addProfile.healthGoal}
                    onChange={updateAddProfile}
                >
                    <option value='maintain'>I want to maintain my weight</option>
                    <option value='lose'>I want to lose weight</option>
                    <option value='gain'>I want to gain weight</option>
                </select>
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
