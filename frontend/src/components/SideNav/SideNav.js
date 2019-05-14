import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import './SideNav.css';

const SideNav = props => (
    <UserContext.Consumer>
        {
            context => {
                const checkActive = (match, location) => {
                    return (match != null)
                }

                const logoutHandler = () => {
                    context.logout();
                    props.closeSideNav();
                }

                const searchHandler = (event) => {
                    if (event.key === "Enter") {
                        props.history.push("/search/" + event.target.value); 
                    }
                    props.closeSideNav();
                }

                return (
                    <div className="side-nav">
                        { context.token && (
                            <React.Fragment>
                                <h3 align="center">{context.name}</h3>
                                <hr />
                            </React.Fragment>
                        )}
                        <ul className="options">
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/" exact isActive={checkActive} activeClassName="selected">HOME</NavLink>
                            </li>
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/malware" isActive={checkActive} activeClassName="selected">MALWARE NEWS</NavLink>
                            </li>
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/vulnerabilities" isActive={checkActive} activeClassName="selected">VULNERABILITIES NEWS</NavLink>
                            </li>
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/cyber_threat" isActive={checkActive} activeClassName="selected">CYBER THREAT NEWS</NavLink>
                            </li>
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/cloud_security" isActive={checkActive} activeClassName="selected">CLOUD SECURITY NEWS</NavLink>
                            </li>
                            <li onClick={props.closeSideNav}>
                                <NavLink to="/software_exploits" isActive={checkActive} activeClassName="selected">SOFTWARE EXPLOITS NEWS</NavLink>
                            </li>
                        </ul>
                        <ul className="features">
                            <li className="search">
                                <a>
                                    <i className="fas fa-search"></i> &nbsp; 
                                    <input className="search-bar" type="text" name="search" placeholder="Search" onKeyPress={searchHandler} />
                                </a>
                            </li>
                            { !context.token && (
                                <React.Fragment>
                                    <li onClick={props.login}><a><i className="fas fa-sign-in-alt"></i> &nbsp; LOGIN</a></li>
                                    <li onClick={props.register}><a><i className="fas fa-user-plus"></i> &nbsp;REGISTER</a></li>
                                </React.Fragment>
                            )}
                            { context.token && (
                                <React.Fragment>
                                    <li onClick={logoutHandler}><a><i className="fas fa-sign-out-alt"></i> &nbsp;LOGOUT</a></li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                );
            }
        }
    </UserContext.Consumer>
);

export default withRouter(SideNav);