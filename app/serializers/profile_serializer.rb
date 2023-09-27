class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :sex, :age, :weight, :vegetarian, :vegan, :gluten_free, :dairy_free, :health_goal
    
    belongs_to :user
end
