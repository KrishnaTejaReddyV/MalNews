import React from 'react';
import { NavLink } from 'react-router-dom';

import Image from '../Image/Image';

import './TopCard.css';

const TopCard = props => {
    return (
        <div className="top-card">
            <div className="top-card-image">
                <NavLink to={ "/article/" + props.article.id }>
                    <Image src={props.article.urlToImage} />
                </NavLink>
            </div>
            <div className="top-card-content">
                <div className="title">
                    <NavLink to={ "/article/" + props.article.id }>
                        <h1>{props.article.title}</h1>
                    </NavLink>
                </div>
                <p><i className="far fa-user"></i> {props.article.author || "Unknown"}</p>
                <p><i className="far fa-clock"></i> {(new Date(props.article.publishedAt)).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default TopCard;