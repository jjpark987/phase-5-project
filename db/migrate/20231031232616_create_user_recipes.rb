class CreateUserRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :user_recipes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true
      t.integer :rating
      t.string :comments
      t.boolean :is_favorite

      t.timestamps
    end
  end
end
