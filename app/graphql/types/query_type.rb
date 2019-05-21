module Types
  class QueryType < Types::BaseObject
    field :all_articles, function: Resolvers::ArticleSearch
    field :all_comments, [CommentType], null: false

    def all_comments
      Comment.all
    end    
  end
end
