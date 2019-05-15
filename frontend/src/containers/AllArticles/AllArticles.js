import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryList from '../../components/CategoryList/CategoryList';
import TopCard from '../../components/TopCard/TopCard';
import Loader from '../../components/Loader/Loader';

import './AllArticles.css';

class AllArticles extends Component {
    state = {
        articles: [],
        pageCount: 0,
        isLoading: false
    }

    componentWillMount() {
        if (this.state.articles.length === 0) {
            this.setState({isLoading: true});

            const requestBody = {
                query: `
                    query {
                        allArticles (category: "", first: 10, skip:${this.state.pageCount * 10}) {
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
                const articles = [...this.state.articles, ...resData.data.allArticles];
                this.props.appendArticles(resData.data.allArticles);
                this.setState({ articles: articles, isLoading: false });
            }).catch (err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
        }
    }

    loadMoreArticles = async () => {
        await this.setState((prevState) => {return {isLoading: true, pageCount: prevState.pageCount + 1}});

        const requestBody = {
            query: `
                query {
                    allArticles (category: "", first: 10, skip:${this.state.pageCount * 10}) {
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
            const articles = [...this.state.articles, ...resData.data.allArticles];
            this.props.appendArticles(resData.data.allArticles);
            this.setState({ articles: articles, isLoading: false });
        }).catch (err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }


    render() {
        return (
            <React.Fragment>
                {this.state.isLoading && <Loader />}
                <div className="top-section">
                    <div className="left-pane">
                    {!this.state.isLoading && 
                        <TopCard article={this.state.articles[0]} />}
                    </div>
                    <div className="right-pane-top">
                    {!this.state.isLoading && 
                        <TopCard article={this.state.articles[1]} />}
                    </div>
                    <div className="right-pane-bottom">
                    {!this.state.isLoading && 
                        <TopCard article={this.state.articles[2]} />}
                    </div>
                </div>
                <div className="bottom-section">
                    <CategoryList articles={this.state.articles.slice(3)} loadArticles={this.loadMoreArticles} />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        appendArticles: (articles) => dispatch({type: "APPEND_ARTICLES", articles: articles})
    }
}

export default connect(null, mapDispatchToProps)(AllArticles);
