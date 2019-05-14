module Mutations
    class Downvote < BaseMutation
      argument :article_id, ID, required: false
  
      type Types::VoteType
  
      def resolve(article_id: nil)
        vote = Vote.find_by(
          article: Article.find(article_id),
          user: context[:current_user]
        )
        vote.destroy
      end
    end
end