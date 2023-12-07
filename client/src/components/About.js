import React from "react";
import { Link, useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    return(
        <div id='about' className='flex-column-center'>
            <Link to='/'>RANDOM<br />RECIPES</Link>
            <img 
                src='/book.png'
                alt='book'
                width='20%'
                onClick={() => navigate('/')}
            />
            <div id='about-details'>
                <p>Create your profile to find your recommended daily caloric intake</p>
                <p>Go to All Recipes to view or add new recipes</p>
                <p>Save recipes to My Recipes with personal comments</p>
                <p>Star your favorite recipes</p>
            </div>
        </div>
    );
}

export default About;
