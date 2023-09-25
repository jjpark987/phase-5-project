import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authSlice";

function Auth() {
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    const [newAccount, setNewAccount] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState([]);

    function updateNewAccount(e) {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    }

    function submitNewAccount(e) {
        e.preventDefault();

        const requestBody = {
            user: {
                email: newAccount.email,
                username: newAccount.username,
                password: newAccount.password,
                password_confirmation: newAccount.passwordConfirmation
            }
        };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(userData => console.log(userData));
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={submitNewAccount}>
                <label htmlFor='signup-email'>Email:</label>
                <input 
                    id='signup-email' 
                    name='email'
                    value={newAccount.email} 
                    onChange={updateNewAccount}
                    required
                />
                <label htmlFor='signup-username'>Username:</label>
                <input 
                    id='signup-username' 
                    name='username'
                    value={newAccount.username} 
                    onChange={updateNewAccount}
                    required
                />
                <label htmlFor='signup-password'>Password:</label>
                <input 
                    id='signup-password' 
                    name='password'
                    value={newAccount.password} 
                    onChange={updateNewAccount}
                    required
                />
                <label htmlFor='signup-password-confirmation'>Password Confirmation:</label>
                <input 
                    id='signup-password-confirmation' 
                    name='passwordConfirmation'
                    value={newAccount.passwordConfirmation} 
                    onChange={updateNewAccount}
                    required
                />
                <button>Sign Up</button>
            </form>
            <div>
                {errors.error && (errors.error.map((error, index) => 
                    <h3 key={index}>{error}</h3>
                ))}
            </div>
        </div>
    );
}

export default Auth;
