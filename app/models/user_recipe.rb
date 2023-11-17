class UserRecipe < ApplicationRecord
    belongs_to :user
    belongs_to :recipe

    validates :user_id, :recipe_id, presence: true, numericality: { only_integer: true }
    validates :recipe_id, uniqueness: true
end
