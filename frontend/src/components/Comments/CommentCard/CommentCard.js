import React from 'react';

// import Comments from '../Comments';

import './CommentCard.css';

const CommentCard = props => {
    return (
        <li className="comment">
            <div className="comment-card">
                <div className="info">
                    <div className="author">
                        <i className="far fa-user"></i> Samuel 
                    </div>
                    <div className="date">
                        <i className="far fa-calendar-alt"></i> 2-3-2019
                    </div>
                    <div className="time">
                        <i className="far fa-clock"></i> 02:30
                    </div>
                    <div className="reply-count">
                        <i className="fas fa-reply"></i> 
                        <a href="##"> 7 replies</a>
                    </div>
                </div>
                <div className="comment-content">{props.comment.content}</div>
            </div>
            <div className="replies">
                {/* <Comments /> */}
            </div>
        </li>
    );
}

export default CommentCard;