import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../reducers/profileSlice";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    const [editProfile, setEditProfile] = useState({
        sex: profile.sex,
        age: profile.age,
        heightFeet: profile.heightFeet,
        heightInches: profile.heightInches,
        weight: profile.weight,
        activityLevel: profile.activityLevel,
        healthGoal: profile.healthGoal,
        vegetarian: profile.vegetarian,
        vegan: profile.vegan,
        glutenFree: profile.glutenFree,
        dairyFree: profile.dairyFree
    });
    const [errors, setErrors] = useState([]);

    function updateEditProfile(e) {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    }

    function submitEditProfile(e) {
        e.preventDefault();

        const requestBody = {
            profile: {
                user_id: user.id,
                sex: editProfile.sex,
                age: editProfile.age,
                height: parseInt(editProfile.heightFeet) * 12 + parseInt(editProfile.heightInches),
                weight: editProfile.weight,
                activity_level: editProfile.activityLevel,
                health_goal: editProfile.healthGoal,
                vegetarian: editProfile.vegetarian,
                vegan: editProfile.vegan,
                gluten_free: editProfile.glutenFree,
                dairy_free: editProfile.dairyFree
            }
        }

        fetch(`/profiles/${profile.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
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
            <h1>Edit Profile</h1>
            <form onSubmit={submitEditProfile}>
                <label htmlFor='edit-sex'>Sex:</label>
                <select
                    id='edit-sex'
                    name='sex'
                    value={editProfile.sex}
                    onChange={updateEditProfile}
                >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <label htmlFor='edit-age'>Age:</label>
                <input 
                    id='edit-age' 
                    name='age'
                    value={editProfile.age}
                    onChange={updateEditProfile}
                />
                <label htmlFor='edit-height-feet'>Height (ft, in):</label>
                <input 
                    id='edit-height-feet' 
                    name='heightFeet'
                    value={editProfile.heightFeet}
                    onChange={updateEditProfile}
                />
                <input 
                    id='edit-height-inches' 
                    name='heightInches'
                    value={editProfile.heightInches}
                    onChange={updateEditProfile}
                />
                <label htmlFor='edit-weight'>Weight (lbs):</label>
                <input 
                    id='edit-weight' 
                    name='weight'
                    value={editProfile.weight}
                    onChange={updateEditProfile}
                />
                <label htmlFor='edit-activity-level'>Activity level:</label>
                <select 
                    id='edit-activity-level' 
                    name='activityLevel'
                    value={editProfile.activityLevel}
                    onChange={updateEditProfile}
                >
                    <option value='sedentary'>Little to no exercise</option>
                    <option value='light'>Light exercise 1-3 days/week</option>
                    <option value='moderate'>Moderate exercise 3-5 days/week</option>
                    <option value='high'>Hard exercise 6-7 days/week</option>
                    <option value='vigorous'>Very hard exercise everyday with physical job</option>
                </select>
                <label htmlFor='edit-health-goal'>Health goal:</label>
                <select 
                    id='edit-health-goal' 
                    name='healthGoal'
                    value={editProfile.healthGoal}
                    onChange={updateEditProfile}
                >
                    <option value='lose'>I want to lose weight</option>
                    <option value='maintain'>I want to maintain my weight</option>
                    <option value='gain'>I want to gain weight</option>
                </select>
                <label htmlFor='edit-vegetarian'>Vegetarian:</label>
                <select 
                    id='edit-vegetarian' 
                    name='vegetarian'
                    value={editProfile.vegetarian}
                    onChange={updateEditProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='edit-vegan'>Vegan:</label>
                <select 
                    id='edit-vegan' 
                    name='vegan'
                    value={editProfile.vegan}
                    onChange={updateEditProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='edit-gluten-free'>Gluten free:</label>
                <select 
                    id='edit-gluten-free' 
                    name='glutenFree'
                    value={editProfile.glutenFree}
                    onChange={updateEditProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label htmlFor='edit-dairy-free'>Dairy free:</label>
                <select 
                    id='edit-dairy-free' 
                    name='dairyFree'
                    value={editProfile.dairyFree}
                    onChange={updateEditProfile}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <button>Update Profile</button>
            </form>
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
        </div>
    );
}

export default EditProfile;
