# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'rest-client'

# puts 'Seeding 10 users...'

# 10.times do 
#     User.create(
#         username: Faker::Internet.username,
#         email: Faker::Internet.email,
#         password: '1',
#         password_confirmation: '1'
#     )
# end

# puts '... done seeding users'

# puts 'Seeding 10 profiles to the existing 10 users...'

# id = 1

# 10.times do
#     Profile.create(
#         user_id: id,
#         sex: ['male', 'female'].sample,
#         age: rand(12..70),
#         height: rand(54..90),
#         weight: rand(90.0..200.0).round(1),
#         activity_level: ['sedentary', 'light', 'moderate', 'high', 'vigorous'].sample,
#         health_goal: ['lose', 'maintain', 'gain'].sample,
#         vegetarian: [true, false].sample,
#         vegan: [true, false].sample,
#         gluten_free: [true, false].sample,
#         dairy_free: [true, false].sample
#     )

#     id += 1
# end

# puts '... done seeding profiles'

puts 'Seeding chicken, beef, pork, fish, pasta, rice, egg, soup, vegetable, and fruit recipes from Spoonacular...'

response_chicken = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=chicken&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

# response_beef = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=beef&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_pork = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pork&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_fish = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=fish&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_pasta = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_rice = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=rice&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_egg = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=egg&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_soup = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=soup&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_vegetable = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=vegetable&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

# response_fruit = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=fruit&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=10&ranking=2', {
#     'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
#     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
# })

recipes_array = [response_chicken, 
# response_beef, response_pork, response_fish, response_pasta, response_rice, response_egg, response_soup, response_vegetable, response_fruit
]

recipes_array.each do |recipe_query|
    recipe_object = JSON.parse(recipe_query)

    recipe_object['results'].each do |recipe|
        recipe_calories = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Calories' }.first['amount'].round

        recipe_proteins = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Protein' }.first['amount'].round

        recipe_carbs = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Carbohydrates' }.first['amount'].round

        recipe_fats = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Fat' }.first['amount'].round

        recipe_ingredients = recipe['extendedIngredients'].map { |ingredient|
            {
                name: ingredient['nameClean'],
                amount: ingredient['amount'],
                unit: ingredient['unit']
            }
        }.uniq { |ingredient| ingredient[:name] }

        recipe_instructions = recipe['analyzedInstructions'].first['steps'].map { |step| 
            step['step']
        }

        Recipe.create(
            name: recipe['title'],
            image: recipe['image'],
            cuisines: recipe['cuisines'],
            types: recipe['dishTypes'],
            is_vegetarian: recipe['vegetarian'],
            is_vegan: recipe['vegan'],
            is_gluten_free: recipe['glutenFree'],
            is_dairy_free: recipe['dairyFree'],
            calories: recipe_calories,
            proteins: recipe_proteins,
            carbs: recipe_carbs,
            fats: recipe_fats,
            servings: recipe['servings'],
            ingredients: recipe_ingredients,
            instructions: recipe_instructions
        )
    end
end

puts '... done seeding recipes'
