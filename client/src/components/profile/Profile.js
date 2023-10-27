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
            <h3>{profile.sex === 'male' ? 'Male' : 'Female'}</h3>
            <h3>{profile.age} years old</h3>
            <h3>{profile.heightFeet} ft {profile.heightInches} in</h3>
            <h3>{profile.weight} lbs</h3>
            <h3>Activity Level: {profile.activityLevel.charAt(0).toUpperCase() + profile.activityLevel.slice(1)}</h3>
            <h3>Health Goal: To {profile.healthGoal} weight</h3>
            <h3>*BMR: {profile.bmr} calories/day</h3>
            <h3>**TDEE: {profile.tdee} calories/day</h3>
            <h1>***Recommended Daily Caloric Intake: {profile.recommendedCalories} calories/day</h1>
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
            <div><i>
                <p>*Basal metabolic rate represents the number of calories your body needs in a day to maintain basic physiological functions while at rest. This is calcuated using the Mifflin-St Jeor equation.</p>
                <p>**Total daily energy expenditure represents the number of calories your body needs in a day to maintain your current weight while taking into account your level of physical activity. This is calcuated by multiplying the BMR by the activity level multiplyer.</p>
                <ul>
                    <li>Sedentary (little to no exercise): BMR x 1.2</li>
                    <li>Light (light exercise 1-3 days/week): BMR x 1.375</li>
                    <li>Moderate (moderate exercise 3-5 days/week): BMR x 1.55</li>
                    <li>High (hard exercise 6-7 days/week): BMR x 1.725</li>
                    <li>Vigorous (very hard exercise everyday with physical job): BMR x 1.9</li>
                </ul>
                <p>***The recommended daily caloric intake takes into account your health goal.</p>
                <ul>
                    <li>To lose weight: TDEE - 400</li>
                    <li>To maintain weight: TDEE</li>
                    <li>To gain weight: TDEE + 400</li>
                </ul>
            </i></div>
            <Link to='/profile/edit'>Edit Profile</Link>
        </div>
    );
}

export default Profile;
