import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={
                    <Home />
                } />
                <Route path='/auth' element={
                    <Auth />
                } />
                <Route path='*' element={<h1>Path not found</h1>} />
            </Routes>
        </div>
    );
}

export default App;
