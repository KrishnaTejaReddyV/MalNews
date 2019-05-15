import React from 'react';

import Comments from '../Comments';

import './CommentCard.css';

// const Pluralize = (count) => {
//     return (count + " " + (count === 1 ? "reply" : "replies"));
// }

const CommentCard = props => {
    let replies = null;
    if (props.comment.replies.length > 0) {
        replies = <Comments comments={props.comment.replies} type="reply" />
    }

    return (
        <li className="comment">
            <div className="comment-card">
                <div className="info">
                    <div className="author">
                        <i className="far fa-user"></i> { props.comment.postedBy.name } 
                    </div>
                    <div className="date">
                        <i className="far fa-calendar-alt"></i> { (new Date(props.comment.publishedAt).toLocaleDateString()) }
                    </div>
                    <div className="time">
                        <i className="far fa-clock"></i> { (new Date(props.comment.publishedAt).toLocaleTimeString()) }
                    </div>
                    {/* <div className="reply-count">
                        <i className="fas fa-reply"></i> { Pluralize(props.comment.replies.length) }
                    </div> */}
                </div>
                <div className="comment-content">{props.comment.content}</div>
            </div>
            <div className="replies">
                { replies }
            </div>
        </li>
    );
}

export default CommentCard;