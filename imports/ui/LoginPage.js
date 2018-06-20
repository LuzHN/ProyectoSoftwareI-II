import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import './../client/styles/Login';

export default class LoginPage extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
    }

    onRegister() {
         //redirigir a pagina register
         this.props.history.push("/register");
    }

    onLogin() {
        /*Metodo para el boton Login*/
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
          if (err) {
              
            if (email == "" && password == ""){
                let loginEmpty = document.getElementById("emptyLogin");
                loginEmpty.classList.add("show");
                loginEmpty.innerHTML = "Please enter your information.";
                setTimeout(function() {
                    loginEmpty.classList.remove("show"); 
                }, 3000);
            } else if (email == "") {
                let emailEmpty = document.getElementById("emailEmpty");
                emailEmpty.classList.add("show");
                emailEmpty.innerHTML = "Please enter your email.";
                setTimeout(function() {
                    emailEmpty.classList.remove("show");
                }, 3000);
            } else if (password == "") {
                let passwordEmpty = document.getElementById("passwordEmpty");
                passwordEmpty.classList.add("show");
                passwordEmpty.innerHTML = "Please enter your password.";
                setTimeout(function() {
                    passwordEmpty.classList.remove("show");
                }, 3000);
            } else {
                let errorLogin = document.getElementById("loginError");
                errorLogin.classList.add("show");
                errorLogin.innerHTML = "Unable to log in. Check your information."
                setTimeout(function() {
                    errorLogin.classList.remove("show"); 
                }, 3000);    
            }//Fin del if anidado

          }else {
<<<<<<< HEAD
            this.props.history.push("/menu");
=======

            let loginSuccessful = document.getElementById("successfulLogin");
            loginSuccessful.classList.add("show");
            loginSuccessful.innerHTML = "Logged in successfully."
            setTimeout(function() {
                loginSuccessful.classList.remove("show"); 
            }, 3000);
            email = "";
            password = "";
>>>>>>> 8-view-de-cliente
          }
        });
    }

    render() {
        return (
            <div className = "Login">
                <form className = "userDataForm" onSubmit = {this.handleSubmit.bind(this)}>

                        <div className = "Image"></div>

                        <label className = "emailLabel">Email</label>
                        <input className = "emailInput" placeholder = "Email" id = "emailBox"type = "email" pattern="[^ @]*@[^ @]*" ref = "email"/>

                        <label className = "passwordLabel">Password</label>
                        <input className = "passwordInput" placeholder = "Password" id = "passwordBox" type = "password" ref = "password"/>

                        <div className = "Buttons">
                            <button className = "loginButton" onClick = {this.onLogin.bind(this)}>Login</button>
                            <label className = "orLabel">OR</label>
                            <button className = "registerButton" onClick = {this.onRegister.bind(this)}>Register</button>
                        </div>
                    <div id = "emptyLogin"></div>
                    <div id = "emailEmpty"></div>
                    <div id = "passwordEmpty"></div>
                    <div id = "loginError"></div>
                    <div id = "successfulLogin"></div>
                </form>
            </div>
        );
    }

}
