module Mutations
    class CreateComment < BaseMutation
        argument :content, String, required: true
        argument :parent_type, String, required: true
        argument :parent_id, Int, required: true
    
        type Types::CommentType
    
        def resolve(content: nil, parent_type:nil, parent_id: nil)
            if parent_type == "Article"
                Comment.create!(
                    content: content,
                    published_at: Time.now.utc,
                    parent: Article.find_by(id:parent_id),
                    user: context[:current_user]
                )
            elsif parent_type == "Comment"
                Comment.create!(
                    content: content,
                    published_at: Time.now.utc,
                    parent: Comment.find_by(id: parent_id),
                    user: context[:current_user]
                )
            end
        end
    end
end