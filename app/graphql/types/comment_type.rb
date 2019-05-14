module Types
    class CommentType < BaseObject
      field :id, ID, null: false
      field :content, String, null: false
      field :published_at, String, null: true
      field :posted_by, UserType, null: true, method: :user
      field :parent_type, String, null: false
      field :parent_id, ID, null: false
      field :replies, [Types::CommentType], null: false
    end
  end