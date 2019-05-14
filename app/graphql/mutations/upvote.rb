module Mutations
    class Upvote < BaseMutation
      argument :article_id, ID, required: false
  
      type Types::VoteType
  
      def resolve(article_id: nil)
        Vote.create!(
          article: Article.find(article_id),
          user: context[:current_user]
        )
      end
    end
end