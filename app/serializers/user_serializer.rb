class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :username, :password_digest

    has_one :profile
    has_many :user_recipes
end
