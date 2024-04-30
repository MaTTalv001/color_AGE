class AddSecretWordToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :secret_word, :string
  end
end
