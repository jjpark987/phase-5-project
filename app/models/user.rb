class User < ApplicationRecord
    has_one :profile
    has_many :meals
    has_many :recipes, through: :meals

    has_secure_password

    validates :email, :username, presence: true, uniqueness: true
end
