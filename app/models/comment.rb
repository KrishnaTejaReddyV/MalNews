class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :parent, polymorphic: true
    has_many :replies, as: :parent, :class_name => "Comment"
end
