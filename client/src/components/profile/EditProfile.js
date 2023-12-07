import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../slices/profileSlice";
import LoginPrompt from "../LoginPrompt";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
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
        setEditProfile({
            ...editProfile, 
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
        });
    }

    function submitEditProfile(e) {
        e.preventDefault();

        const requestBody = {
            profile: {
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

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }

    return (
        <div className='flex-column-center'>
            <h1><i><u>Edit Profile</u></i></h1>
            <form className='profile-form' onSubmit={submitEditProfile}>
                <div>
                    <label htmlFor='edit-sex'>Sex: </label>
                    <select
                        id='edit-sex'
                        name='sex'
                        value={editProfile.sex}
                        onChange={updateEditProfile}
                    >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='edit-age'>Age: </label>
                    <input 
                        id='edit-age' 
                        name='age'
                        value={editProfile.age}
                        onChange={updateEditProfile}
                    />
                </div>
                <div>
                    <label htmlFor='edit-height-feet'>Height (ft, in): </label>
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
                </div>
                <div>
                    <label htmlFor='edit-weight'>Weight (lbs): </label>
                    <input 
                        id='edit-weight' 
                        name='weight'
                        value={editProfile.weight}
                        onChange={updateEditProfile}
                    />
                </div>
                <div>
                    <label htmlFor='edit-activity-level'>Activity level: </label>
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
                </div>
                <div>
                    <label htmlFor='edit-health-goal'>Health goal: </label>
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
                </div>
                <div>
                    <label htmlFor='edit-vegetarian'>Vegetarian</label>
                    <input 
                        id='edit-vegetarian' 
                        type='checkbox' 
                        name='vegetarian'
                        checked={editProfile.vegetarian}
                        onChange={updateEditProfile}
                    />
                </div>
                <div>
                    <label htmlFor='edit-vegan'>Vegan</label>
                    <input 
                        id='edit-vegan' 
                        type='checkbox' 
                        name='vegan'
                        checked={editProfile.vegan}
                        onChange={updateEditProfile}
                    />
                </div>
                <div>
                    <label htmlFor='edit-gluten-free'>Gluten free</label>
                    <input 
                        id='edit-gluten-free' 
                        type='checkbox' 
                        name='glutenFree'
                        checked={editProfile.glutenFree}
                        onChange={updateEditProfile}
                    />
                </div>
                <div>
                    <label htmlFor='edit-dairy-free'>Dairy free</label>
                    <input 
                        id='edit-dairy-free' 
                        type='checkbox' 
                        name='dairyFree'
                        checked={editProfile.dairyFree}
                        onChange={updateEditProfile}
                    />
                </div>
                <button>UPDATE PROFILE</button>
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
