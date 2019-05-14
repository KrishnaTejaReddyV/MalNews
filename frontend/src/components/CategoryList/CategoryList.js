import React from 'react';

import Card from '../Card/Card';

import './CategoryList.css';

const getTitle = (category) => {
    switch (category) {
        case "malware": return "Malware News";
        case "vulnerabilities": return "Vulnerabilities News";
        case "cyber_threat": return "Cyber Threat News";
        case "cloud_security": return "Cloud Security News";
        case "software_exploits": return "Software Exploits News";
        case "search": return "Search Results";
        default: return "Latest News";
    }
}

const CategoryList = props => {
    const cards = props.articles.map((article) => {
        return <Card key={article.id} article={article} redirectToPost={false} />
    });

    return (
        <div className="category-list">
            <div className="header">
                <h3>
                    {props.category ? getTitle(props.category) : "Latest News"}
                </h3>
            </div>
            <ul className="card-list">
                { cards }
            </ul> 
            <div className="load-more">
                <button className="btn" onClick={props.loadArticles}>Load More News</button>
            </div>                      
        </div>
    );
}

export default CategoryList;