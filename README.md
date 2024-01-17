# Random Recipes

Discover new recipes, save the favorites, and create a profile to get the best results for your taste and preferences.

[Video Walkthrough](https://youtu.be/uyz3J8TJOTM)

## Description

Random Recipes uses a React frontend and Ruby on Rails backend. This single-page application is a personal, virtual cookbook for users who want to browse through different recipes, save their favorites, and add new ones to the database. Once users sign in using their email, username, and password, they are prompted to create a profile. The information stored in profile is used to display the most relavent recipes to the user based on their dietary restrictions.

## Models

There are four models: User, Profile, Recipe, and UserRecipe. The model associations are as follows: a one-to-one between User and Profile and a many-to-many between the User and Recipe with UserRecipe as the join table.

### User

The User model uses standard password hashing techniques for authentication and authorizaion using the BCrypt library. I use the `has_secure_password` method, which adds the virtual attribute `password_confirmation` to our model and provides the `authenticate` method for password verification on login. Cookies and sessions are used client-side to store encrypted user information, which is used to auto-login the user on page refresh. I integrate Regular Expressions in the model validation to make sure users are inputting a proper email.

### Profile

The Profile model contains all the details about the user including their sex, age, weight, height, activity level, health goal, and more. This information is used to calucate the user's Basal Metabolic Rate (BMR), Total Daily Energy Expendituire (TDEE), and recommended caloric intake. These are calculated in the Profile model as instance methods.

### Recipe

I initially seed my database by extracting/scraping the relavent data from the Spoonacular Recipe-Food-Nutrition API. To maintain data integrity, I included `before_validation` instance methods to downcase all attributes and remove similar values. In order to extract all the unique values from the `cuisines` and `types` attributes, I wrote a class method to return this data into a ruby object and have it sent to the frontend's Redux store through the controller action. On the frontend, this is used to create the filter mechanism, along with a search bar and sort by functionality.

### UserRecipe

When the user decides to save a recipe, a UserRecipe instance is created and saved, along with the `is_favorite`, `rating`, and `comments` attributes. Users can implement all four CRUD actions (Create, Read, Update, Delete) to UserRecipe.

## Other features

- Uses Redux and `@reduxjs/toolkit` for frontend state management
- Employs `schema.rb` and Active Record Migrations for version control
- Integrates custom routes for non-RESTful controller actions
- Utilizes BCrypt's `authenticate` method on login for authentication
- Includes a `before_action :authorize` method to run before every controller action (except for a few exceptions) for authorization
- Applies appropriate serializers to format data sent to frontend
- Implements an aesthetic layout via CSS

## API Documentation

This application uses Spoonacular Recipe-Food-Nutrition API by David. Please see this [link](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) for the official documentation.

## Support

Please contact me at jjpark987@gmail.com for any questions.
