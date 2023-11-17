class UserRecipeSerializer < ActiveModel::Serializer
    attributes :id, :comments, :is_favorite, :recipe
    
    has_one :recipe
end
