class User < ApplicationRecord
    has_one :profile
    has_many :user_recipes
    has_many :recipes, through: :user_recipes

    has_secure_password

    validates :email, :username, presence: true, uniqueness: true
end
