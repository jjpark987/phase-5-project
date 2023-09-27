import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './reducers/authSlice';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/me')
        .then(res => {
            if (res.ok) {
                res.json().then(userData => {
                    dispatch(login(userData));
                });
            }
        })
        .catch(error => console.error(error));
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={
                    <Home />
                } />
                <Route path='/login' element={
                    <Auth />
                } />
                <Route path='*' element={<h1>Path not found</h1>} />
            </Routes>
        </div>
    );
}

export default App;
