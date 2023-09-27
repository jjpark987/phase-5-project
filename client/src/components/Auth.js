import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authSlice";

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showLogin, setShowLogin] = useState(true);
    const [account, setAccount] = useState({
        username: '',
        password: '',
    });
    const [newAccount, setNewAccount] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState([]);

    function handleShowLoginClick() {
        setShowLogin(!showLogin);
        setErrors([]);
    }

    function updateAccount(e) {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    function updateNewAccount(e) {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    }

    function createSession(loginData) {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(userData => {
                    dispatch(login(userData));
                    setErrors([]);
                    navigate('/');
                });
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }

    function submitAccount(e) {
        e.preventDefault();

        const requestBody = {
            username: account.username,
            password: account.password
        };

        createSession(requestBody);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(() => {
                    const loginData = {
                        username: newAccount.username,
                        password: newAccount.password
                    };

                    createSession(loginData);
                });
            } else {
                responseBody.then(errorMsg => setErrors(errorMsg));
            }
        })
        .catch(error => console.error(error));
    }
    
    if (showLogin) {
        return (
            <div>
                <button type='button' onClick={handleShowLoginClick}>Sign Up</button>
                <h1>Log In</h1>
                <form onSubmit={submitAccount}>
                    <label htmlFor='login-username'>Username:</label>
                    <input 
                        id='login-username' 
                        name='username'
                        value={account.username} 
                        onChange={updateAccount}
                        required
                    />
                    <label htmlFor='login-password'>Password:</label>
                    <input 
                        id='login-password' 
                        name='password'
                        value={account.password} 
                        onChange={updateAccount}
                        required
                    />
                    <button>Log In</button>
                </form>
                <div>
                    {errors.error && (errors.error.map((error, index) => 
                        <h3 key={index}>{error}</h3>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <button type='button' onClick={handleShowLoginClick}>Log In</button>
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
}

export default Auth;
