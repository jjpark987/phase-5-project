class MealSerializer < ActiveModel::Serializer
  attributes :id, :user, :recipe, :day, :meal_type
end
