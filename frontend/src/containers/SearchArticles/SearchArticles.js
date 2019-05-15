import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryList from '../../components/CategoryList/CategoryList';
import Loader from '../../components/Loader/Loader';

class SearchArticles extends Component {
    state = {
        articles: [],
        pageCount: 0,
        isLoading: false,
        keyword: null
    }

    componentDidMount() {
        this.searchArticle(this.props.match.params.keyword);
    }

    componentWillReceiveProps(nextProps) {
        this.searchArticle(nextProps.match.params.keyword);
    }

    searchArticle = (keyword) => {
        if (this.state.keyword !== keyword) {
            this.setState({isLoading: true, keyword: keyword});

            const requestBody = {
                query: `
                    query {
                        allArticles (
                            category: "", 
                            first: 10, 
                            skip:${this.state.pageCount * 10},
                            search: {
                                descriptionContains: "${keyword}"
                                OR: {
                                    authorContains: "${keyword}"
                                } OR: {
                                    titleContains: "${keyword}"
                                } OR: {
                                    urlContains: "${keyword}"
                                }
                            }
                        ) {
                            id
                            title
                            author
                            description
                            url
                            urlToImage
                            publishedAt
                            comments {
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
                            votes {
                                id
                                user {
                                    id
                                }
                            }
                        }
                    }
                    
                `
            };
            
            fetch('/graphql', {
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
                const articles = resData.data.allArticles;
                this.props.appendArticles(articles);
                this.setState({ articles: articles, isLoading: false });
            }).catch (err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
        }
    }

    loadMoreArticles = async () => {
        const keyword = this.props.match.params.keyword;
        await this.setState((prevState) => {return {isLoading: true, pageCount: prevState.pageCount + 1}});

        const requestBody = {
            query: `
                query {
                    allArticles (
                        category: "", 
                        first: 10, 
                        skip:${this.state.pageCount * 10},
                        search: {
                            descriptionContains: "${keyword}"
                            OR: {
                                authorContains: "${keyword}"
                            } OR: {
                                titleContains: "${keyword}"
                            } OR: {
                                urlContains: "${keyword}"
                            }
                        }
                    ) {
                        id
                        title
                        author
                        description
                        url
                        urlToImage
                        publishedAt
                        comments {
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
                        votes {
                            id
                            user {
                                id
                            }
                        }
                    }
                }
              
            `
        };
      
        fetch('/graphql', {
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
            const articles = [...this.state.articles, ...resData.data.allArticles];
            this.props.appendArticles(resData.data.allArticles);
            this.setState({ articles: articles, isLoading: false });
        }).catch (err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    render() {
        if (this.state.articles.length !== 0) {
            return (
                <React.Fragment>
                    {this.state.isLoading && <Loader />}
                    <CategoryList 
                        articles={this.state.articles} 
                        category="search"
                        loadArticles={this.loadMoreArticles} 
                    />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {this.state.isLoading && <Loader />}
                    {!this.state.isLoading && <h1 className="error_header">No Relevant Articles Found</h1>}
                </React.Fragment>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        appendArticles: (articles) => dispatch({type: "APPEND_ARTICLES", articles: articles})
    }
}

export default connect(null, mapDispatchToProps)(SearchArticles);
