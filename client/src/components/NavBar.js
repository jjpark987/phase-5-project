import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                dispatch(logout());
                navigate('/');
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <nav>
            <button onClick={() => navigate('/')}>TITLE</button>
            {userId ? 
                <button onClick={logoutUser}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
