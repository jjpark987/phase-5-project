class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :image
      t.string :cuisine
      t.string :type
      t.boolean :is_vegetarian
      t.boolean :is_vegan
      t.boolean :is_gluten_free
      t.boolean :is_dairy_free
      t.float :calories
    #   t.float :proteins
    #   t.float :carbs
    #   t.float :fats
      t.integer :servings
      t.string :ingredients, array: true, default: []
      t.string :instructions, array: true, default: []

      t.timestamps
    end
  end
end
