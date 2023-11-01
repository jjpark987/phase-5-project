class UserRecipe < ApplicationRecord
    belongs_to :user
    belongs_to :recipe

    validates :user_id, :recipe_id, :rating, presence: true, numericality: { only_integer: true }
end
