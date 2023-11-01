import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { clearProfile } from "../slices/profileSlice";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const profileId = useSelector(state => state.profile.id);

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            dispatch(logout());
            dispatch(clearProfile());
            navigate('/');
        })
        .catch(error => console.error(error));
    }

    return (
        <nav>
            <button onClick={() => navigate('/')}>TITLE</button>
            <button onClick={() => navigate('/recipes')}>All Recipes</button>
            <button onClick={() => navigate('/user_recipes')}>My Recipes</button>
            <button onClick={() => profileId ? navigate('/profile') : navigate('/profile/create')}>My Profile</button>
            {userId ? 
                <button onClick={logoutUser}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
