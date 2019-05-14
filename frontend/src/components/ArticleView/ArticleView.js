import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Card from '../Card/Card';
import Comments from '../Comments/Comments';
import UserContext from '../../context/UserContext';

import './ArticleView.css';

class ArticleView extends Component {
    static contextType = UserContext;

    render() {
        this.props.viewArticle(this.props.match.params.id);

        if (this.props.articles.length === 0) {
            return <Redirect to='/' />
        } else {
            let article = this.props.selectedArticle;

            if (article) {
                return (
                    <div className="category-list">
                        <ul className="article-view">
                            <Card 
                                article={article}
                                redirectToPost={true}
                            />
                            <li className="options">
                                { this.context.token && (
                                    <React.Fragment>
                                        <button className="btn" onClick="toggleVote">Upvote</button>
                                    </React.Fragment>
                                )}
                                <button className="btn">
                                    <a href={ "//" + article.url }>Read Full Article</a>
                                </button>
                            </li>
                            <li id="comments">
                                <p className="comments-header">Comments</p>
                                <Comments comments={article.comments} />
                            </li>
                        </ul> 
                    </div>
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
        viewArticle: (id) => dispatch({type: "VIEW_ARTICLE", id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);