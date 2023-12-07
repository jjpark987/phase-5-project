import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div id='home' className='flex-column-center'>
            <Link to='/about'>RANDOM<br />RECIPES</Link>
            <img 
                src='/recipebook.jpg'
                alt='recipebook'
                width='55%'
                onClick={() => navigate('/about')}
            />
        </div>
    );
}

export default Home;
