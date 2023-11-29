import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './slices/authSlice';
import { updateProfile } from './slices/profileSlice';
import { updateAttributes } from './slices/attributesSlice';
import { updateUserRecipes } from './slices/userRecipesSlice';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Auth from './components/Auth';
import Profile from './components/profile/Profile';
import Info from './components/profile/Info';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AllRecipes from './components/recipe/AllRecipes';
import ShowRecipe from './components/recipe/ShowRecipe';
import CreateRecipe from './components/recipe/CreateRecipe';
import AllUserRecipes from './components/userRecipe/AllUserRecipes';
import ShowUserRecipe from './components/userRecipe/ShowUserRecipe';
import CreateUserRecipe from './components/userRecipe/CreateUserRecipe';
import EditUserRecipe from './components/userRecipe/EditUserRecipe';
import PageNotFound from './components/PageNotFound';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(userData => {
            dispatch(login(userData));
            userData.profile && dispatch(updateProfile(userData.profile));
            userData.user_recipes && dispatch(updateUserRecipes(userData.user_recipes));
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
                <Route path='/about' element={
                    <About />
                } />
                <Route path='/login' element={
                    <Auth />
                } />
                <Route path='/profile' element={
                    <Profile />
                } />
                <Route path='/profile/info' element={
                    <Info />
                } />
                <Route path='/profile/create' element={
                    <CreateProfile />
                } />
                <Route path='/profile/edit' element={
                    <EditProfile />
                } />
                <Route path='/recipes' element={
                    <AllRecipes />
                } />
                <Route path='/recipes/:id' element={
                    <ShowRecipe />
                } />
                <Route path='/recipes/create' element={
                    <CreateRecipe />
                } />
                <Route path='/my-recipes' element={
                    <AllUserRecipes />
                } />
                <Route path='/my-recipes/:id' element={
                    <ShowUserRecipe />
                } />
                <Route path='/my-recipes/create' element={
                    <CreateUserRecipe />
                } />
                <Route path='/my-recipes/:id/edit' element={
                    <EditUserRecipe />
                } />
                <Route path='*' element={
                    <PageNotFound />
                } />
            </Routes>
        </div>
    );
}

export default App;
