# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'

puts 'Seeding 3 users...'

user = 1

3.times do
    User.create(
        username: user,
        email: "#{user}test@gmail.com",
        password: "#{user}",
        password_confirmation: "#{user}"
    )

    user += 1
end

puts '... done seeding users'

puts 'Seeding a profile to user 1...'

Profile.create(
    user_id: 1,
    sex: 'male',
    age: 29,
    height: 70,
    weight: 155.5,
    activity_level: 'moderate',
    health_goal: 'maintain',
    vegetarian: false,
    vegan: false,
    gluten_free: false,
    dairy_free: true
)

puts '... done seeding profile'

puts 'Seeding 20 results per chicken, beef, pork, fish, pasta, rice, egg, soup, vegetable, and fruit recipes from Spoonacular...'

response_chicken = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=chicken&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_beef = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=beef&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=5&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_pork = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pork&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_fish = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=fish&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_pasta = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_rice = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=rice&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_egg = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=egg&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_soup = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=soup&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_vegetable = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=vegetable&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

response_fruit = RestClient.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=fruit&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=desc&maxCarbs=100&maxProtein=100&maxCalories=1000&maxFat=100&number=20&ranking=2', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
})

recipes_array = [response_chicken, response_beef, response_pork, response_fish, response_pasta, response_rice, response_egg, response_soup, response_vegetable, response_fruit]

recipes_array.each do |recipe_query|
    recipe_object = JSON.parse(recipe_query)

    recipe_object['results'].each do |recipe|
        recipe_calories = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Calories' }.first['amount'].round

        recipe_proteins = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Protein' }.first['amount'].round

        recipe_carbs = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Carbohydrates' }.first['amount'].round

        recipe_fats = recipe['nutrition']['nutrients'].filter { |nutrient| nutrient['name'] == 'Fat' }.first['amount'].round

        recipe_ingredients = recipe['extendedIngredients'].map { |ingredient|
            "#{ingredient['amount']} #{ingredient['unit']} #{ingredient['nameClean']}"
        }.uniq

        if recipe['analyzedInstructions'].present?
            recipe_instructions = recipe['analyzedInstructions'].first['steps'].map { |step| step['step'] }
        else
            recipe_instructions = ["No instructions available. Please visit #{recipe['sourceUrl']} for more information."]
        end

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

puts 'Seeding 5 user recipes for user 1...'

user_recipe = 1

5.times do
    UserRecipe.create(
        user_id: 1,
        recipe_id: user_recipe,
        comments: ["Test comment #{user_recipe}", ''].sample,
        is_favorite: [true, false].sample
    )

    user_recipe += 1
end

puts '... done seeding user recipes'
