class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :sex, :age, :height_feet, :height_inches, :weight, :activity_level, :health_goal, :vegetarian, :vegan, :gluten_free, :dairy_free, :bmr, :tdee, :recommended_calories
    
    belongs_to :user

    def height_feet
        if object.height.present?
            (object.height / 12).to_int
        end
    end

    def height_inches
        if object.height.present?
            object.height % 12
        end
    end

    def bmr
        object.calculate_bmr.round
    end

    def tdee
        object.calculate_tdee.round
    end

    def recommended_calories
        object.calculate_recommended_calories.round
    end
end
