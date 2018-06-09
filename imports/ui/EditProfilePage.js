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

                    {/*First Name and Last Name inputs and labels.*/}
                    <div className = "editNamesBox">
                        <div className = "firstNameBox">
                            <label className = "firstNameLabel">First Name</label>
                            <input className = "firstNameInput" id = "firstNameId"/> 
                        </div>
                        <div className = "lastNameBox">
                            <label className = "lastNameLabel">Last Name</label>
                            <input className = "lastNameInput" id = "passwordBox" /> 
                        </div> 
                    </div>
                    {/*First Name and Last Name inputs and labels ends here.*/}

                    {/*Old Password input and label.*/}
                    <div className = "editNamesBox">
                        <div className = "oldPasswordBox">
                            <label className = "oldPasswordLabel">Old Password</label>
                            <input className = "oldPasswordInput" id = "oldPasswordId"/>
                        </div>
                    </div>
                    {/*Old Password input and label ends here.*/}

                    {/*New and Confirm Password inputs and labels.*/}
                    <div className = "editNamesBox">
                        <div className = "firstNameBox">
                            <label>New Password</label>
                            <input id = "newPasswordId"/> 
                        </div>
                        <div className = "lastNameBox">
                            <label>Confirm Password</label>
                            <input id = "confirmPasswordId"/> 
                        </div> 
                    </div>
                    {/*New and Confirm Password inputs and labels end here.*/}

                    {/*New and Confirm Password inputs and labels.*/}
                    <div className = "editNamesBox">
                        <div className = "directionBox">
                            <label>Dirección</label>
                            <textarea id = "directionTextArea" maxLength='140' rows="5"/> 
                        </div>
                        <div className = "directionButtonBox">
                            <button>Agregar Dirección</button>
                        </div> 
                    </div>
                    {/*New and Confirm Password inputs and labels end here.*/}


                </form> 
            </div>
        );
    }

}
