import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginPrompt from "../LoginPrompt";

function Profile() {
    const userId = useSelector(state => state.auth.id);
    const profile = useSelector(state => state.profile);

    if (!userId) {
        return (
            <LoginPrompt />
        );
    }

    return (
        <div className='flex-column-center'>
            <h1><i><u>My Profile</u></i></h1>
            <div id='profile-info'>
                <p>{profile.sex === 'male' ? 'Male' : 'Female'}</p>
                <p>{profile.age} years old</p>
                <p>{profile.heightFeet} ft {profile.heightInches} in</p>
                <p>{profile.weight} lbs</p>
                <p>Activity level is <b>{profile.activityLevel}</b>.</p>
                <p>Health goal is to <b>{profile.healthGoal}</b> weight.</p>
                <p>
                    {   
                        (!profile.vegetarian && !profile.vegan && !profile.glutenFree && !profile.dairyFree) ? 
                        'You do not have any dietary restrictions' : 
                        'Dietary restriction(s) is/are'
                    } 
                    <b>
                        {[
                            profile.vegetarian && ' vegetarian',
                            profile.vegan && ' vegan',
                            profile.glutenFree && ' gluten free',
                            profile.dairyFree && ' dairy free'
                        ]
                        .filter(Boolean).join(',')}
                    </b>.
                </p>
                <Link className='profile-link' to='/profile/edit'>Edit Profile</Link>
            </div>
            <div id='profile-calculations'>
                <h3>Calculated Daily Caloric Intakes:</h3>
                <p>BMR: {profile.bmr}</p>
                <p>TDEE: {profile.tdee}</p>
                <p><b>Recommended: {profile.recommendedCalories}</b></p>
                <Link className='profile-link' to='/profile/info'>More Info</Link>
            </div>
        </div>
    );
}

export default Profile;
