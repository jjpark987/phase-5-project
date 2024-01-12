# Phase 5 Project: Random Recipes

## Introduction

Welcome to Random Recipes, a dynamic web application built with React on the frontend and Rails Active Record on the backend for robust data collection and management. The frontend experience utilizes Redux for streamlined state management, ensuring real-time synchronization with the PostgreSQL database. This single-page application adheres to RESTful routing conventions, providing an intuitive and efficient user experience.

## Models

There are four models: User, Profile, Recipe, and UserRecipe. The User model uses standard password hasing techniques for authentication and authorizaion security. Along with signing up, logging in, and logging out, there is an auto log in procedure on start-up using cookies and sessions.

The Profile model is in a one-to-one association with the User model, containing all the details about the user including their sex, age, weight, height, activity level, health goal, and more. This information is used to calucate the user's BMR, TDEE, and recommended caloric intake. The calcuations are done in the Profile model definition and are relayed to the frontend via the controller.

When seeding, the recipes are extracted from Spoonacular Recipe-Food-Nutrition API and saved into our app database. The information is appropriately formatted for easy use throughout the app. Only the recipes that fall in line with the user's dietary restrictions are rendered.

UserRecipe is a jointable for the many-to-many association between User and Recipe. When the user decides to save a recipe, this creates a UserRecipe instance that also includes a comment attribute. Users can implement all four CRUD actions to UserRecipe.

## API Documentation

This application uses Spoonacular Recipe-Food-Nutrition API by David. Please see this [link](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) for the official documentation.

## Demo

[Video Walkthrough](https://youtu.be/uyz3J8TJOTM)

## Support

Please contact me at jjpark987@gmail.com for any questions.
