class Recipe < ApplicationRecord
    # has_many :meals
    # has_many :users, through: :meals

    before_validation :downcase_attributes

    validates :name, uniqueness: true

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
end
