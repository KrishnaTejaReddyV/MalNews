module Types
    class ArticleType < BaseObject
        field :id, ID, null: false
        field :source, String, null: true
        field :author, String, null: true
        field :title, String, null: true
        field :description, String, null: true
        field :url, String, null: true
        field :urlToImage, String, null: true
        field :publishedAt, String, null: true
        field :content, String, null: true
        field :category, String, null: true
        field :comments, [Types::CommentType], null: false
        field :votes, [Types::VoteType], null: false
    end
end