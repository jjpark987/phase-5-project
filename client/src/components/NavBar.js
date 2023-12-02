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
            <button onClick={() => navigate('/about')}>ABOUT</button>
            <button onClick={() => navigate('/recipes')}>ALL RECIPES</button>
            <button onClick={() => navigate('/my-recipes')}>MY RECIPES</button>
            <button onClick={() => profileId ? navigate('/profile') : navigate('/profile/create')}>MY PROFILE</button>
            {userId ? 
                <button onClick={() => logoutUser()}>LOGOUT</button> 
            : 
                <button onClick={() => navigate('/login')}>LOGIN</button>
            }
        </nav>
    );
}

export default NavBar;
