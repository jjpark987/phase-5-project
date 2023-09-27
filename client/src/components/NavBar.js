import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import { clearProfile } from "../reducers/profileSlice";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    function handleProfileClick() {
        if (user.id) {
            user.profileCreated ? navigate('/profile') : navigate('/profile/add');
        } else {
            navigate('/login-prompt');
        }
    }

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                dispatch(logout());
                dispatch(clearProfile());
                navigate('/');
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <nav>
            <button onClick={() => navigate('/')}>TITLE</button>
            <button onClick={handleProfileClick}>My Profile</button>
            {user.id ? 
                <button onClick={logoutUser}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
