class Recipe < ApplicationRecord
    # has_many :meals
    # has_many :users, through: :meals

    before_validation :downcase_attributes, :remove_repeat_cuisines, :remove_repeat_types

    validates :name, uniqueness: true
    validates :calories, :proteins, :carbs, :fats, :servings, numericality: true
    validate :validate_ingredients

    def self.unique_attributes
        {
            cuisines: pluck(:cuisines).flatten.uniq.sort.map(&:capitalize), 
            types: pluck(:types).flatten.uniq.sort.map(&:capitalize)
        }
    end

    private

    def downcase_attributes
        self.cuisines = cuisines.map(&:downcase)
        self.types = types.map(&:downcase)
    end

    def remove_repeat_cuisines
        cuisines.reject! do |cuisine| 
            cuisine == 'bbq' ||
            cuisine == 'eastern european'
        end
    end

    def remove_repeat_types
        types.reject! do |type| 
            type == 'antipasti' ||
            type == 'antipasto' ||
            type == "hor d'oeuvre" ||
            type == 'drink' ||
            type == 'main course' ||
            type == 'morning meal' ||
            type == 'starter'
        end
    end

    def validate_ingredients
        ingredients.each do |ingredient|
            unless ingredient =~ /^\d+(\.\d+)?\s+\w+(\s+\w+)*$/
                errors.add(:ingredients, "'#{ingredient}' is not in the correct format. Needs to start with a number then string(s) afterwards. For example, '0.5 tablespoons olive oil' or '3 apples'.")
            end
        end
    end
end
