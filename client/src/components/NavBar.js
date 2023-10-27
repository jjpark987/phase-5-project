import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import { clearProfile } from "../reducers/profileSlice";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userId = useSelector(state => state.auth.id);
    const profileId = useSelector(state => state.profile.id);

    function handleProfileClick() {
        if (userId) {
            profileId ? navigate('/profile') : navigate('/profile/create');
        } else {
            navigate('/login-prompt');
        }
    }

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
            <button onClick={() => navigate('/recipes')}>Recipes</button>
            <button onClick={handleProfileClick}>My Profile</button>
            {userId ? 
                <button onClick={logoutUser}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
