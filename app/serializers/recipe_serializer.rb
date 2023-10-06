class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :cuisines, :types, :is_vegetarian, :is_vegan, :is_gluten_free, :is_dairy_free, :calories, :proteins, :carbs, :fats, :servings, :ingredients, :instructions
end
