class CreateReactions < ActiveRecord::Migration[6.0]
  def change
    create_table :reactions do |t|
      t.references :post, null: false, foreign_key: true
      t.string :color_code

      t.timestamps
    end
  end
end