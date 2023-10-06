class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.reference :user, null: false, foreign_key: true
      t.reference :recipe, null: false, foreign_key: true
      t.string :day
      t.string :meal_type

      t.timestamps
    end
  end
end
