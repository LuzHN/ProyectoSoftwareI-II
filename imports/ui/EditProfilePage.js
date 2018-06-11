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
                <h1>Editar Perfil</h1>
                    {/*First Name and Last Name inputs and labels.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>First Name</label>
                            <input id = "firstNameId" maxLength='140' placeholder='Enter First Name'/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Last Name</label>
                            <input id = "passwordBox" maxLength='140' placeholder='Enter Last Name'/> 
                        </div> 
                    </div>
                    {/*First Name and Last Name inputs and labels ends here.*/}

                    {/*Old Password input and label.*/}
                    <div className = "passBox">
                        
                    </div>
                    {/*Old Password input and label ends here.*/}

                    {/*New and Confirm Password inputs and labels.*/}
                    <div className = "passBox">

                        <div className = "oldPasswordBox">
                            <label>*Old Password</label>
                            <input type="password" id = "oldPasswordId" placeholder='Old Password'/>
                        </div>

                        <div className = "leftContainerBox">
                            <label>*New Password</label>
                            <input type="password" id = "newPasswordId" placeholder='New Password'/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>*Confirm Password</label>
                            <input type="password" id = "confirmPasswordId" placeholder='Confirm Password'/> 
                        </div> 
                    </div>
                    {/*New and Confirm Password inputs and labels end here.*/}

                    {/*First two phone numbers.*/}
                     <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>*Phone Number 1</label>
                            <InputMask mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Phone Number 2</label>
                            <InputMask mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                    </div>
                    {/*First two phone numbers end here.*/}

                    {/*Last two phone numbers.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Phone Number 3</label>
                            <InputMask mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Phone Number 4</label>
                            <InputMask mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                    </div>
                    {/*Last two phone numbers end here.*/}

                    {/*First two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>*Address 1</label>
                            <textarea id = "direction1TextArea" maxLength='140' rows="5" placeholder='Enter Address'/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Address 2</label>
                            <textarea id = "direction2TextArea" maxLength='140' rows="5" placeholder='Enter Address'/> 
                        </div>
                    </div>
                    {/*First two directions text areas end here.*/}

                    {/*Last two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Address 3</label>
                            <textarea id = "direction3TextArea" maxLength='140' rows="5" placeholder='Enter Address'/> 
                        </div>
                        <div className = "rightContainerBox">
                            <label>Address 4</label>
                            <textarea id = "direction4TextArea" maxLength='140' rows="5" placeholder='Enter Address'/> 
                        </div>
                    </div>
                    {/*Last two directions text areas end here.*/}

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
