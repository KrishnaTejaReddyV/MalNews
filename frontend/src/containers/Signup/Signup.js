import React, { Component } from 'react';

import Loader from '../../components/Loader/Loader';
import UserContext from '../../context/UserContext';

import './Signup.css';

class Signup extends Component {

    state = {
        isLogin: this.props.type === 'login',
        isLoading: false
    };

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.nameEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.conPasswordEl = React.createRef();
    }

    switchType = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin }
        });
    }

    signupHandler = (event) => {
        event.preventDefault();

        this.setState({isLoading: true});

        let name = "";
        let email = this.emailEl.current.value;
        let password = this.passwordEl.current.value;
        let conPassword = "";

        if (!this.state.isLogin) {
            name = this.nameEl.current.value;
            conPassword = this.conPasswordEl.current.value;
        }

        if (email.trim().length === 0 || password.trim().length === 0) {
            this.setState({isLoading: false});
            this.props.closeModals();
            return;
        }

        let request = {
            query: `
                mutation Login($email: String!, $password: String!) {
                    signinUser (email: {
                        email: $email
                        password: $password
                    }) {
                        token
                        user {
                            id
                            name
                        }
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        if (!this.state.isLogin) {
            if (password !== conPassword) {
                this.setState({isLoading: false});
                this.props.closeModals();
                return;
            }

            request = {
                query: `
                    mutation Register($name: String!, $email: String!, $password: String!) {
                        createUser (
                            name: $name, 
                            authProvider:{
                                email: {
                                    email: $email
                                    password: $password
                                }
                            }
                        ) {
                            id
                            name
                            email
                        }
                    }
                  
                `,
                variables: {
                    name: name,
                    email: email,
                    password: password
                }
            }
        }

        fetch('/graphql', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(request),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then (res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then (resData => {
            if (this.state.isLogin && resData.data.signinUser.token) {
                this.context.login(
                    resData.data.signinUser.user.id,
                    resData.data.signinUser.user.name,
                    resData.data.signinUser.token
                );
            }
            this.setState({isLoading: false});
            this.props.closeModals();
        }).catch(error => {
            this.setState({isLoading: false});
            this.props.closeModals();
            console.log(error);
        });
    }
    
    render() {
        return (
            <React.Fragment>
                {this.state.isLoading && <Loader />}
                <div className="signup">
                    <div className="header">
                        <h3>
                            { this.state.isLogin ? "Log In" : "Register" }
                        </h3>
                    </div>
                    <form className="signup-form" onSubmit={this.signupHandler}>
                        {this.state.isLogin ? null : (
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <input type="name" id="name" ref={this.nameEl} />
                            </div>
                        )}
                        <div className="form-control">
                            <label htmlFor="email">E-Mail</label>
                            <input type="email" id="email" ref={this.emailEl} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" ref={this.passwordEl} />
                        </div>
                        {this.state.isLogin ? null : (
                            <div className="form-control">
                                <label htmlFor="con-password">Confirm Password</label>
                                <input type="password" id="con-password" ref={this.conPasswordEl} />
                            </div>
                        )}
                        <div className="form-actions">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={this.switchType}>
                                Switch to {this.state.isLogin ? "Register" : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Signup;