module Types
    class VoteType < BaseObject
        field :id, ID, null: false
        field :user, UserType, null: false
        field :article, ArticleType, null: false
    end
end