class UserRecipeSerializer < ActiveModel::Serializer
    attributes :id, :rating, :comments, :is_favorite
    
    has_one :user
    has_one :recipe
end
