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
        <div>
            <h1>My Profile</h1>
            <img 
                src='/profile_icon.png'
                alt='person'
                width='5%'
            />
            <Link to='/profile/info'>More Info</Link>
            <h3>{profile.sex === 'male' ? 'Male' : 'Female'}</h3>
            <h3>{profile.age} years old</h3>
            <h3>{profile.heightFeet} ft {profile.heightInches} in</h3>
            <h3>{profile.weight} lbs</h3>
            <h3>Activity Level: {profile.activityLevel.charAt(0).toUpperCase() + profile.activityLevel.slice(1)}</h3>
            <h3>Health Goal: To {profile.healthGoal} weight</h3>
            <h3>BMR: {profile.bmr} calories/day</h3>
            <h3>TDEE: {profile.tdee} calories/day</h3>
            <h1>Recommended Daily Caloric Intake: </h1>
            <h1>{profile.recommendedCalories} calories/day</h1>
            <h3>Dietairy Restrictions: 
                {(!profile.vegetarian && !profile.vegan && !profile.glutenFree && !profile.dairyFree) && ' None'} 
                {[
                    profile.vegetarian && ' Vegetarian',
                    profile.vegan && ' Vegan',
                    profile.glutenFree && ' Gluten free',
                    profile.dairyFree && ' Dairy free'
                ]
                .filter(Boolean).join(',')}
            </h3>
            <Link to='/profile/edit'>Edit Profile</Link>
        </div>
    );
}

export default Profile;
