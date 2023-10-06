class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :image
      t.string :cuisines, array: true, default: []
      t.string :types, array: true, default: []
      t.boolean :is_vegetarian
      t.boolean :is_vegan
      t.boolean :is_gluten_free
      t.boolean :is_dairy_free
      t.integer :calories
      t.integer :proteins
      t.integer :carbs
      t.integer :fats
      t.integer :servings
      t.string :ingredients, array: true, default: []
      t.string :instructions, array: true, default: []

      t.timestamps
    end
  end
end
