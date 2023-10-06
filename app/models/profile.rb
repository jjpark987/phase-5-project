class Profile < ApplicationRecord
    belongs_to :user

    validates_uniqueness_of :user_id

    validates :user_id, :sex, :age, :height, :weight, :activity_level, :health_goal, presence: true
    validates :user_id, :age, :height, :weight, numericality: true
    validates :sex, inclusion: ['male', 'female']
    validates :activity_level, inclusion: ['sedentary', 'light', 'moderate', 'high', 'vigorous']
    validates :health_goal, inclusion: ['lose', 'maintain', 'gain']
    validates :vegetarian, :vegan, :gluten_free, :dairy_free, inclusion: [true, false]

    def calculate_bmr
        case sex
        when 'male'
            (4.536 * weight) + (15.88 * height) - (5 * age) + 5
        else 
            (4.536 * weight) + (15.88 * height) - (5 * age) - 161
        end
    end

    def calculate_tdee
        case activity_level
        when 'sedentary'
            calculate_bmr * 1.2
        when 'light'
            calculate_bmr * 1.375
        when 'moderate'
            calculate_bmr * 1.55
        when 'high'
            calculate_bmr * 1.725
        else
            calculate_bmr * 1.9
        end
    end

    def calculate_recommended_calories
        case health_goal
        when 'lose'
            calculate_tdee - 400
        when 'gain'
            calculate_tdee + 400
        else
            calculate_tdee
        end
    end
end
