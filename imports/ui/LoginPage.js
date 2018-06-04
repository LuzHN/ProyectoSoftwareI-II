import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import './../client/styles/Login';

export default class LoginPage extends React.Component {
    userData = {
        email : '',
        password: ''
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.userData);
        this.setState({
            email : '',
            password: ''
        });
    }

    render() {
        return (
            <div className = "Login">
                <form className = "userDataForm" onSubmit = {this.handleSubmit.bind(this)}>

                        <div className = "Image"></div>

                        <label className = "emailLabel">Email</label>
                        <input className = "emailInput" placeholder = "Email" type = "email" />

                        <label className = "passwordLabel">Password</label>
                        <input className = "passwordInput" placeholder = "Password" type = "password"/>

                        <button className = "loginButton">Login</button>
                    
                </form>
            </div>
        );
    }

}