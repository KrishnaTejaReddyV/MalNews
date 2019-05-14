module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :signin_user, mutation: Mutations::UserSignIn
    field :create_comment, mutation: Mutations::CreateComment
    field :upvote, mutation: Mutations::Upvote
    field :downvote, mutation: Mutations::Downvote
    field :clear_articles, mutation: Mutations::ClearArticles
  end
end
