import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './reducers/authSlice';
import { updateProfile } from './reducers/profileSlice';
import { updateAttributes } from './reducers/attributesSlice';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import Recipes from './components/recipe/Recipes';
import RecipeDetails from './components/recipe/RecipeDetails';
import CreateRecipe from './components/recipe/CreateRecipe';
import LoginPrompt from './components/LoginPrompt';
import PageNotFound from './components/PageNotFound';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(userData => {
            dispatch(login(userData));
            userData.profile && dispatch(updateProfile(userData.profile));
        })
        .catch(error => console.error(error));

        fetch('/recipes/unique_attributes')
        .then(res => res.json())
        .then(attributesData => dispatch(updateAttributes(attributesData)))      
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
                <Route path='/profile/create' element={
                    <CreateProfile />
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
                <Route path='/recipes/create' element={
                    <CreateRecipe />
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
