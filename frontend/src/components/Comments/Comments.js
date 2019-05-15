import React from 'react';

import CommentCard from './CommentCard/CommentCard';
import UserContext from '../../context/UserContext';

import './Comments.css';

const Comments = props => (
    <UserContext.Consumer>
        {
            context => {
                let comments = props.comments.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment}/>
                });
            
                return (
                    <div className="comments-container">
                        <ul className="comment-list">
                            { comments }
                            { context.token && (
                                <li>
                                    <div className="post-comment">
                                        <textarea 
                                            onKeyPress={ (e) => props.commentHandler(e, props.type) }
                                            placeholder="Add Comment">
                                        </textarea>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                );
            }
        }
    </UserContext.Consumer>
);

export default Comments;