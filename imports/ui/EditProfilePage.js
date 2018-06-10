import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';
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
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>First Name</label>
                            <input id = "firstNameId"/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Last Name</label>
                            <input id = "passwordBox" /> 
                        </div> 
                    </div>
                    {/*First Name and Last Name inputs and labels ends here.*/}

                    {/*Old Password input and label.*/}
                    <div className = "passBox">
                        <div className = "oldPasswordBox">
                            <label>Old Password</label>
                            <input id = "oldPasswordId"/>
                        </div>
                    </div>
                    {/*Old Password input and label ends here.*/}

                    {/*New and Confirm Password inputs and labels.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>New Password</label>
                            <input id = "newPasswordId"/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Confirm Password</label>
                            <input id = "confirmPasswordId"/> 
                        </div> 
                    </div>
                    {/*New and Confirm Password inputs and labels end here.*/}

                    {/*First two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Dirección 1</label>
                            <textarea id = "direction1TextArea" maxLength='140' rows="5"/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Dirección 2</label>
                            <textarea id = "direction2TextArea" maxLength='140' rows="5"/> 
                        </div>
                    </div>
                    {/*First two directions text areas end here.*/}

                    {/*Last two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Dirección 3</label>
                            <textarea id = "direction3TextArea" maxLength='140' rows="5"/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Dirección 4</label>
                            <textarea id = "direction4TextArea" maxLength='140' rows="5"/> 
                        </div>
                    </div>
                    {/*Last two directions text areas end here.*/}

                     {/*First two phone numbers.*/}
                     <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Teléfono 1</label>
                            <InputMask mask="9999-9999"/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Teléfono 2</label>
                            <InputMask mask="9999-9999"/>
                        </div>
                    </div>
                    {/*First two phone numbers end here.*/}

                    {/*Last two phone numbers.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Teléfono 3</label>
                            <InputMask mask="9999-9999"/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Teléfono 4</label>
                            <InputMask mask="9999-9999"/>
                        </div>
                    </div>
                    {/*Last two phone numbers end here.*/}

                     <div className = "Buttons">
                            <button className = "disableAccBtn">Disable Account</button>
                            <label className = "spaceLabel"></label>
                            <button className = "saveChangesBtn">Save Changes</button>
                    </div>

                </form> 
            </div>
        );
    }

}
