import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryList from '../../components/CategoryList/CategoryList';
import Loader from '../../components/Loader/Loader';

class FilteredArticles extends Component {
    state = {
        articles: [],
        pageCount: 0,
        isLoading: false
    }

    categories = ["malware", "vulnerabilities", "cyber_threat", "cloud_security", "software_exploits"];

    componentWillMount() {
        this.getArticles(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getArticles(nextProps);
    }

    getDbCategory = (category) => {
        switch (category) {
            case "malware": return "malware";
            case "vulnerabilities": return "vulnerability";
            case "cyber_threat": return "cyber threat";
            case "cloud_security": return "cloud security";
            case "software_exploits": return "software exploits";
            default: return "";
        }
    }

    getArticles = (props) => {
        if (this.categories.includes(props.match.params.category)) {
            this.setState({isLoading: true});

            const requestBody = {
                query: `
                    query {
                        allArticles (category: "${this.getDbCategory(props.match.params.category)}", first: 10, skip:${this.state.pageCount * 10}) {
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
                            }
                        }
                    }
                  
                `
            };
          
            fetch('http://localhost:8000/graphql', {
                method: 'POST',
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
        await this.setState((prevState) => {return {isLoading: true, pageCount: prevState.pageCount + 1}});

        const requestBody = {
            query: `
                query {
                    allArticles (category: "${this.getDbCategory(this.props.match.params.category)}", first: 10, skip:${this.state.pageCount * 10}) {
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
                        }
                    }
                }
              
            `
        };
      
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
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
        if (this.categories.includes(this.props.match.params.category)) {
            return (
                <React.Fragment>
                    {this.state.isLoading && <Loader />}
                    <CategoryList 
                        articles={this.state.articles} 
                        category={this.props.match.params.category}
                        loadArticles={this.loadMoreArticles} 
                    />
                </React.Fragment>
            );
        } else {
            return <h1 className="error_header">Page Not Found</h1>
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        appendArticles: (articles) => dispatch({type: "APPEND_ARTICLES", articles: articles})
    }
}

export default connect(null, mapDispatchToProps)(FilteredArticles);
