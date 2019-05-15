import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AllArticles from './containers/AllArticles/AllArticles';
import FilteredArticles from './containers/FilteredArticles/FilteredArticles';
import SearchArticles from './containers/SearchArticles/SearchArticles';
import Signup from './containers/Signup/Signup';
import ArticleView from './containers/ArticleView/ArticleView';
import Navbar from './components/Navbar/Navbar';
import SideNav from './components/SideNav/SideNav';
import Backdrop from './components/Backdrop/Backdrop';
import UserContext from './context/UserContext';

import './App.css';

class App extends Component {
  state = {
    sideNavOpened: false,
    registering: false,
    loggingIn: false,
    userId: null,
    name: null,
    token: null
  };

  login = (userId, name, token) => {
    this.setState({ userId, name, token });
  }

  logout = () => {
    this.setState({ userId: null, token: null });
  }

  toggleSideNav = () => {
    this.setState(prevState => {
      return { sideNavOpened: !prevState.sideNavOpened }
    });
  }

  toggleRegister = () => {
    this.setState(prevState => {
      return { registering: !prevState.registering }
    });
  }

  toggleLogin = () => {
    this.setState(prevState => {
      return { loggingIn: !prevState.loggingIn }
    });
  }

  closeModals = () => {
    this.setState({ sideNavOpened: false, registering: false, loggingIn: false });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <UserContext.Provider
            value={{
              userId: this.state.userId,
              name: this.state.name,
              token: this.state.token,
              login: this.login,
              logout: this.logout
            }}
          >
            <Navbar toggleSideNav={this.toggleSideNav} />

            {(this.state.sideNavOpened || this.state.registering || this.state.loggingIn) && 
              <Backdrop 
                closeModals={this.closeModals}
              />
            }
            {(this.state.sideNavOpened && (!this.state.registering && !this.state.loggingIn)) && 
              <SideNav 
                closeSideNav={this.toggleSideNav}
                register={this.toggleRegister} 
                login={this.toggleLogin}
              />
            }
            {(this.state.loggingIn || this.state.registering) && 
              <Signup 
                type={this.state.registering ? "register" : "login"} 
                closeModals={this.closeModals} 
              />
            }

            <div className="content">
              <Switch>
                <Route path="/" exact component={AllArticles} />
                <Route path="/article/:id" exact component={ArticleView} />
                <Route path="/search/:keyword" exact component={SearchArticles} />
                <Route path="/:category" component={FilteredArticles} />
              </Switch>
            </div>
            <div className="footer">Copyright</div>
          </UserContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
