import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { clearProfile } from "../slices/profileSlice";
import { clearUserRecipes } from "../slices/userRecipesSlice";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const profileId = useSelector(state => state.profile.id);

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => {
            dispatch(logout());
            dispatch(clearProfile());
            dispatch(clearUserRecipes());
            navigate('/');
        })
        .catch(error => console.error(error));
    }

    return (
        <nav>
            <button onClick={() => navigate('/')}>RECIPE READER</button>
            <button onClick={() => navigate('/about')}>About</button>
            <button onClick={() => navigate('/recipes')}>All Recipes</button>
            <button onClick={() => navigate('/my-recipes')}>My Recipes</button>
            <button onClick={() => profileId ? navigate('/profile') : navigate('/profile/create')}>My Profile</button>
            {userId ? 
                <button onClick={() => logoutUser()}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
