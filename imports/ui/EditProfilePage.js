import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import './../client/styles/EditProfile';

export default class EditProfilePage extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className = "principalDiv">
                <form className = "editProfileForm" onSubmit = {this.handleSubmit.bind(this)}>
                    <div className = "container">

                        <div className = "editNamesBox">
                            <label className = "firstNameLabel">First Name</label>
                            <input className = "firstNameInput" id = "firstNameId"/>   
                            <label className = "lastNameLabel">Last Name</label>
                            <input className = "lastNameInput" id = "passwordBox" />                 
                        </div> {/*Aqui termina el div editNamesBox */}

                        <div className = "oldPasswordBox">
                            <label className = "oldPasswordLabel">Old Password</label>
                            <input className = "oldPasswordInput" id = "oldPasswordId"/>
                        </div>





                    </div> {/*Aqui termina el div Container*/}
                </form> 
            </div>
        );
    }

}
