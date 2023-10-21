import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './reducers/authSlice';
import { updateProfile } from './reducers/profileSlice';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import Profile from './components/profile/Profile';
import AddProfile from './components/profile/AddProfile';
import EditProfile from './components/profile/EditProfile';
import Recipes from './components/recipe/Recipes';
import RecipeDetails from './components/recipe/RecipeDetails';
import PageNotFound from './components/PageNotFound';
import LoginPrompt from './components/LoginPrompt';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/me')
        .then(res => {
            if (res.ok) {
                res.json().then(userData => {
                    dispatch(login(userData));
                    userData.profile && dispatch(updateProfile(userData.profile));
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
                <Route path='/profile' element={
                    <Profile />
                } />
                <Route path='/profile/add' element={
                    <AddProfile />
                } />
                <Route path='/profile/edit' element={
                    <EditProfile />
                } />
                <Route path='/recipes' element={
                    <Recipes />
                } />
                <Route path='/recipes/:id' element={
                    <RecipeDetails />
                } />
                <Route path='/login-prompt' element={
                    <LoginPrompt />
                } />
                <Route path='*' element={
                    <PageNotFound />
                } />
            </Routes>
        </div>
    );
}

export default App;
