import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import './../client/styles/Login';

export default class LoginPage extends React.Component {
    
    state = {
        redirect: true
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    onRegister() {   
         //redirigir a pagina register
         this.props.history.push("/register");
    }

    onLogin() {
        /*Metodo para el boton Login*/ 
        if (document.getElementById("emailBox").value != "" && document.getElementById("passwordBox").value != "") {
            document.getElementById("emailBox").value = "";
            document.getElementById("passwordBox").value = "";
        } 
        if (document.getElementById("passwordBox").value == "" && document.getElementById("emailBox").value == ""){
            alert("Por favor ingrese sus datos.");
        } else if (document.getElementById("emailBox").value == "") {
            alert("Por favor ingrese su correo.");
        } else if (document.getElementById("passwordBox").value == "") {
            alert("Por favor ingrese su contraseña.");
        } 
    }

    render() {
        return (
            <div className = "Login">
                <form className = "userDataForm" onSubmit = {this.handleSubmit.bind(this)}>

                        <div className = "Image"></div>

                        <label className = "emailLabel">Email</label>
                        <input className = "emailInput" placeholder = "Email" id = "emailBox"type = "email"/>

                        <label className = "passwordLabel">Password</label>
                        <input className = "passwordInput" placeholder = "Password" id = "passwordBox" type = "password"/>

                        <div className = "Buttons">
                            <button className = "loginButton" onClick = {this.onLogin.bind(this)}>Login</button>
                            <label className = "orLabel">OR</label>
                            <button className = "registerButton" onClick = {this.onRegister.bind(this)}>Register</button>
                        </div>

                </form>
            </div>
        );
    }

}