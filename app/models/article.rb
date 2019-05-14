class Article < ApplicationRecord
    has_many :comments, as: :parent
    has_many :votes
end
