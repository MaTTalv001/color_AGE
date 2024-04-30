class Post < ApplicationRecord
    has_many :reactions, dependent: :destroy
  end