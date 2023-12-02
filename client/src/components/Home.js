import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div id='home' className='component'>
            <Link to='/about'>RANDOM<br />RECIPES</Link>
            <img 
                src='/recipebook.jpg'
                alt='recipebook'
                width='75%'
                onClick={() => navigate('/about')}
            />
        </div>
    );
}

export default Home;
