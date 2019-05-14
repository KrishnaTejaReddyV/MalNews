import React from 'react';
import { NavLink } from 'react-router-dom';

import Image from '../Image/Image';

import './Card.css';

const Pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

const Card = props => {
    return (
        <li className="card">
            <h3 className="card-title">
                {props.redirectToPost && <a href={ props.article.url }>{props.article.title}</a>}
                {!props.redirectToPost && <NavLink to={ "/article/" + props.article.id }>{props.article.title}</NavLink>}
            </h3>
            <p className="author"><i className="far fa-user"></i> &nbsp;{props.article.author || "Unknown"}</p>
            <p className="date"><i className="far fa-clock"></i> &nbsp;{(new Date(props.article.publishedAt)).toLocaleString()}</p>
            <p className="comments">
                <NavLink to={ "/article/" + props.article.id + "#comments" }>{Pluralize(props.article.comments.length, "comment")}</NavLink> |
                <NavLink to={ "/article/" + props.article.id }> {Pluralize(props.article.votes.length, "upvote")} </NavLink>
            </p>
            <div className="card-description">
                <p>{props.article.description}</p>
            </div>
            <div className="card-image">
                {props.redirectToPost && <a href={ props.article.url }><Image src={props.article.urlToImage} /></a>}
                {!props.redirectToPost && <NavLink to={ "/article/" + props.article.id }><Image src={props.article.urlToImage} /></NavLink>}
            </div>
        </li>
    );
}

export default Card;