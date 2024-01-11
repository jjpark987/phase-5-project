class User < ApplicationRecord
    has_one :profile
    has_many :user_recipes
    has_many :recipes, through: :user_recipes

    has_secure_password

    validates :email, :username, presence: true, uniqueness: true
    validates :email, format: { 
        with: /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/, 
        message: "is not in the correct format." 
    }
end
