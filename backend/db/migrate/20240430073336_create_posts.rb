class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :author_name
      t.text :content
      t.string :era
      t.string :color_code
      t.string :color_name

      t.timestamps
    end
  end
end
