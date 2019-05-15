import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Card from '../../components/Card/Card';
import Comments from '../../components/Comments/Comments';
import UserContext from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';

import './ArticleView.css';

class ArticleView extends Component {
    state = {
        isLoading: false
    }

    upvoted = false;

    static contextType = UserContext;

    upvote = async() => {
        await this.setState({isLoading: true});

        let articleId = this.props.selectedArticle.id;

        const requestBody = {
            query: `
                mutation {
                    upvote (articleId: ${articleId}) {
                        id
                        user {
                            id
                        }
                    }
                }
            `
        };
      
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then (res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then (resData => {
            const vote = { ...resData.data.upvote };
            this.props.appendVote(vote);
            this.setState({ isLoading: false });
        }).catch (err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    downvote = async() => {
        await this.setState({isLoading: true});

        let articleId = this.props.selectedArticle.id;

        const requestBody = {
            query: `
                mutation {
                    downvote (articleId: ${articleId}) {
                        id
                        user {
                            id
                        }
                    }
                }
            `
        };
      
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then (res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then (resData => {
            this.props.removeVote(resData.data.downvote.id);
            this.setState({ isLoading: false });
        }).catch (err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    commentHandler = async (event, type) => {
        if (event.key === "Enter") {
            let content = event.target.value;

            if (type === "comment") {
                event.target.value = "";
                await this.setState({isLoading: true});

                let articleId = this.props.selectedArticle.id;

                const requestBody = {
                    query: `
                        mutation {
                            createComment(
                                content: "${content}",
                                parentId: ${articleId},
                                parentType: "Article"
                            ) {
                                id
                                content
                                publishedAt
                                postedBy {
                                    name
                                }
                                replies {
                                    id
                                }
                            }
                        }

                    `
                };
            
                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(requestBody),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }).then (res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed!');
                    }
                    return res.json();
                }).then (resData => {
                    console.log(resData.data)
                    const comment = { ...resData.data.createComment };
                    this.props.appendComment(comment);
                    this.setState({ isLoading: false });
                }).catch (err => {
                    console.log(err);
                    this.setState({ isLoading: false });
                });
            }
        }
    }

    checkIfUpvoted = (article) => {
        let voted = article.votes.filter(vote => {
            if (vote.user.id === this.context.userId) {
                return true;
            }
            return false;
        });

        if (voted.length > 0) {
            this.upvoted = true;
        }
    }

    render() {
        this.props.viewArticle(this.props.match.params.id);
        this.upvoted = false;

        if (this.props.articles.length === 0) {
            return <Redirect to='/' />
        } else {
            let article = this.props.selectedArticle;

            if (article) {

                this.checkIfUpvoted(article);

                return (
                    <React.Fragment>
                        {this.state.isLoading && <Loader />}
                        <div className="category-list">
                            <ul className="article-view">
                                <Card 
                                    article={article}
                                    redirectToPost={true}
                                />
                                <li className="options">
                                    { this.context.token && (
                                        <React.Fragment>
                                            {!this.upvoted && <button className="btn" onClick={this.upvote}>Upvote</button>}
                                            {this.upvoted && <button className="btn" onClick={this.downvote}>Upvoted</button>}
                                        </React.Fragment>
                                    )}
                                    <button className="btn">
                                        <a href={ article.url }>Read Full Article</a>
                                    </button>
                                </li>
                                <li id="comments">
                                    { (this.context.token || (article.comments.length > 0)) && (
                                        <React.Fragment>
                                            <p className="comments-header">Comments</p>
                                            <Comments 
                                                comments={article.comments} 
                                                type="comment" 
                                                commentHandler={this.commentHandler}
                                            />
                                        </React.Fragment>
                                    )}
                                </li>
                            </ul> 
                        </div>
                    </React.Fragment>
                );
            } else {
                return <h1 className="error_header">Page Not Found</h1>
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        articleIds: state.articleIds,
        comments: state.comments,
        selectedArticle: state.selectedArticle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewArticle: (id) => dispatch({type: "VIEW_ARTICLE", id: id}),
        appendVote: (vote) => dispatch({type: "APPEND_VOTE", vote: vote}),
        appendComment: (comment) => dispatch({type: "APPEND_COMMENT", comment: comment}),
        removeVote: (voteId) => dispatch({type: "REMOVE_VOTE", voteId: voteId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);