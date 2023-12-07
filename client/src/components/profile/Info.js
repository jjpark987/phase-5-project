import React from "react";
import { Link } from "react-router-dom";

function Info() {
    return(
        <div id='info' className='flex-column-center'>
            <h3>BMR</h3>
            <p>
                Basal metabolic rate (BMR) represents the number of calories your body needs in a day to maintain basic physiological functions while at rest. This is calcuated using the Mifflin-St Jeor equation.
            </p>
            <h3>TDEE</h3>
            <p>
                Total daily energy expenditure (TDEE) represents the number of calories your body needs in a day to maintain your current weight while taking into account your level of physical activity. This is calcuated by multiplying the BMR by the activity level multiplyer.
            </p>
            <ul>
                <li>Sedentary (little to no exercise): BMR x 1.2</li>
                <li>Light (light exercise 1-3 days/week): BMR x 1.375</li>
                <li>Moderate (moderate exercise 3-5 days/week): BMR x 1.55</li>
                <li>High (hard exercise 6-7 days/week): BMR x 1.725</li>
                <li>Vigorous (very hard exercise everyday with physical job): BMR x 1.9</li>
            </ul>
            <h3>Recommended Daily Caloric Intake</h3>
            <p>
                The recommended daily caloric intake takes into account your health goal.
            </p>
            <ul>
                <li>To lose weight: TDEE - 400</li>
                <li>To maintain weight: TDEE</li>
                <li>To gain weight: TDEE + 400</li>
            </ul>
            <Link className='profile-link' to='/profile'>Back to Profile</Link>
        </div>
    );
}

export default Info;
