import React from 'react';
import '../../styles/App.css';
import Store from '../stores/PostStore';
import actions from '../actions/PostActionCreators';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    state = {
        user: {username: "", password: ""},
        newUser: {username: "", password: ""},
        authenticated: Store.getAuth()
    }

    componentDidMount = () => {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {
        console.log("onchange");
        this.setState({user: Store.getUser()});
        this.setState({newUser: Store.getNewUser()});
        this.setState({authenticated: Store.getAuth()});
    }

    updateUser = (event) => {
        let {target} = event;
        let user = {};
        
        user[target.name] = target.value;

        actions.updateUser(user);
    }

    updateNewUser = (event) => {
        let {target} = event;
        let user = {};
        
        user[target.name] = target.value;

        actions.updateNewUser(user);
    }

    registerUser = () => {
        let user = Store.getNewUser()
        actions.registerUser(user)
    }

    logIn = () => {
        let user = Store.getUser()
        actions.logIn(user)
    }

    render() {
        let {user, newUser, authenticated} = this.state;

        return (
            <div>
                {authenticated ? 
                <Redirect to="/" />
                :
                <div className="auth-container">
                    <div className="login-container">
                        <div>
                            <b>Login</b>
                        </div>
                        <br/>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        username:
                                    </td>
                                    <td>
                                        <input onChange={this.updateUser}
                                        name="username"
                                        type="text"
                                        value={user.username}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        password:
                                    </td>
                                    <td>
                                        <input onChange={this.updateUser}
                                        name="password"
                                        type="password"
                                        value={user.password}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>

                    <Link to="/">
                        <button onClick={this.logIn}>login</button>
                    </Link>
                    <br/>
                    <br/>

                    <div>
                        <a href="" className="pass-recovery">Forgot your password?</a>
                    </div>
                    <br/>

                    <div className="login-container">
                        <div>
                            <b>Create Account</b>
                        </div>
                        <br/>

                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            username:
                                        </td>
                                        <td>
                                            <input onChange={this.updateNewUser}
                                            name="username"
                                            type="text"
                                            value={newUser.username}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            password:
                                        </td>
                                        <td>
                                            <input onChange={this.updateNewUser}
                                            name="password" 
                                            type="password"
                                            value={newUser.password}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        
                        <div>
                            <Link to="/">
                                <button onClick={this.registerUser}>create account</button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
        )
    }
}
