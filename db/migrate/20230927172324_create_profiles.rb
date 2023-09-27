class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true, unique: true
      t.string :sex
      t.integer :age
      t.float :weight
      t.boolean :vegetarian
      t.boolean :vegan
      t.boolean :gluten_free
      t.boolean :dairy_free
      t.string :health_goal

      t.timestamps
    end
  end
end
