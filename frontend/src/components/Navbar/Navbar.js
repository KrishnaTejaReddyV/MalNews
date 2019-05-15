import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './Navbar.css';



const Navbar = props => {
    const searchHandler = (event) => {
        if (event.key === "Enter") {
          props.history.push("/search/" + event.target.value); 
        }
    }

    return (
        <div className="navbar">
            <i className="fas fa-bars icon" onClick={props.toggleSideNav}></i>
            <nav>
                <div className="logo"><NavLink to="/"><span className="red-text">Mal</span>News</NavLink></div>
                <ul>
                    <li>
                        <NavLink to="/malware" activeClassName="selected">Malware</NavLink>
                    </li>
                    <li>
                        <NavLink to="/vulnerabilities" activeClassName="selected">Vulnerabilities</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cyber_threat" activeClassName="selected">Cyber Threat</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cloud_security" activeClassName="selected">Cloud Security</NavLink>
                    </li>
                    <li>
                        <NavLink to="/software_exploits" activeClassName="selected">Software Exploits</NavLink>
                    </li>
                </ul>
                <div className="search">
                    <input className="search-bar" type="text" name="search" placeholder="Search" onKeyPress={searchHandler} />
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navbar);