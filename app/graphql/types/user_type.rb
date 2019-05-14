module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :comments, [Types::CommentType], null: false
    field :votes, [Types::VoteType], null: false
  end
end