import React from 'react';

import CommentCard from './CommentCard/CommentCard';

import './Comments.css';

const Comments = props => {
    let comments = props.comments.map((comment) => {
        return <CommentCard key={comment.id} comment={comment}/>
    })
    return (
        <div className="comments-container">
            <ul className="comment-list">
                { comments }
                <li>
                    <div className="post-comment">
                        <textarea></textarea>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Comments;