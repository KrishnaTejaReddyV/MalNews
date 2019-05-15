const initialState = {
    comments: [],
    articles: [],
    articleIds: [],
    selectedArticle: null,
    selectedArticleIndex: 0
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case 'VIEW_ARTICLE': {  
            const index = state.articleIds.indexOf(action.id);

            return {
                ...state,
                selectedArticle: state.articles[index],
                selectedArticleIndex: index
            }
        }
        case 'APPEND_ARTICLES' : {
            let articleIds = state.articleIds;
            const newEntries = action.articles.filter((article) => {
                if (!articleIds.includes(article.id)) {
                    articleIds.push(article.id);
                    return true;
                }
                return false;
            });

            return {
                ...state,
                articleIds: articleIds,
                articles: [...state.articles, ...newEntries]
            }
        }
        case 'APPEND_VOTE' : {
            let selArticle = { ...state.selectedArticle };
            selArticle.votes.push(action.vote);

            let articlesArr = [ ...state.articles ];
            articlesArr[state.selectedArticleIndex] = selArticle;

            return {
                ...state,
                articles: articlesArr,
                selectedArticle: selArticle
            } 
        }
        case 'APPEND_COMMENT' : {
            let selArticle = { ...state.selectedArticle };
            selArticle.comments.push(action.comment);

            let articlesArr = [ ...state.articles ];
            articlesArr[state.selectedArticleIndex] = selArticle;

            return {
                ...state,
                articles: articlesArr,
                selectedArticle: selArticle
            } 
        }
        case 'REMOVE_VOTE' : {
            let selArticle = { ...state.selectedArticle };
            selArticle.votes = selArticle.votes.filter((vote) => {
                if (vote.id === action.voteId) {
                    return false;
                }
                return true;
            })

            let articlesArr = [ ...state.articles ];
            articlesArr[state.selectedArticleIndex] = selArticle;

            return {
                ...state,
                articles: articlesArr,
                selectedArticle: selArticle
            } 
        }
    }
    return state;
}

export default reducer;