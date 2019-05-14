const initialState = {
    comments: [],
    articles: [],
    articleIds: [],
    selectedArticle: null
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case 'VIEW_ARTICLE': {       
            const index = state.articleIds.indexOf(action.id);

            return {
                ...state,
                selectedArticle: state.articles[index]
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
    }
    return state;
}

export default reducer;