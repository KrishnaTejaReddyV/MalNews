module Mutations
    class ClearArticles < BaseMutation
  
      type Types::ArticleType
  
      def resolve()
        Article.delete_all
      end
    end
end