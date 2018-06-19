import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';
import { createContainer } from 'meteor/react-meteor-data';

import './../client/styles/EditProfile';


class EditProfilePage extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
    }
    onSubmit(){
        let firstName = this.refs.firstName.value.trim();
        let lastName = this.refs.lastName.value.trim();
        let oldPassword = this.refs.oldPassword.value.trim();
        let newPassword = this.refs.newPassword.value.trim();
        let confirmPassword = this.refs.confirmPassword.value.trim();
        let phoneNumber1 = this.refs.phoneNumber1.value.trim();
        let phoneNumber2 = this.refs.phoneNumber2.value.trim();
        let phoneNumber3 = this.refs.phoneNumber3.value.trim();
        let phoneNumber4 = this.refs.phoneNumber4.value.trim();
        let address1 = this.refs.address1.value.trim();
        let address2 = this.refs.address2.value.trim();
        let address3 = this.refs.address3.value.trim();
        let address4 = this.refs.address4.value.trim();

        Meteor.call('updateUser', {firstName, lastName, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, address1, address2, address3, address4});
        /**
         * Nota: Falta validar que la vieja contraseña sea la misma que tenia antes
         */

        //Validaciones
        let validator = 0;

        if(firstName == '' ||  firstName.match(/[^a-z]/gi)){
            validator=1;
            let firstNameError = this.refs.firstNameError;
            firstNameError.classList.add("show");
            firstNameError.innerHTML = "Please enter a valid name.";
            setTimeout(function() {
                firstNameError.classList.remove("show");
            }, 3000);
        }else if(lastName == '' ||  lastName.match(/[^a-z]/gi)){
            validator=1;
            let lastNameError = this.refs.lastNameError;
            lastNameError.classList.add("show");
            lastNameError.innerHTML = "Please enter a valid name.";
            setTimeout(function() {
                lastNameError.classList.remove("show");
            }, 3000);
        }else if(newPassword != '' && oldPassword =='' ){
            validator=1;
            let oldPasswordError = this.refs.oldPasswordError;
            oldPasswordError.classList.add("show");
            oldPasswordError.innerHTML = "Old password is missing.";
            setTimeout(function() {
                oldPasswordError.classList.remove("show");
            }, 3000);
        }else if (newPassword.length < 9 && oldPassword != '' ) {
            validator=1;
            let newPasswordError = this.refs.newPasswordError;
            newPasswordError.classList.add("show");
            newPasswordError.innerHTML = "Password must be 9 digits long.";
            setTimeout(function() {
                newPasswordError.classList.remove("show");
            }, 3000);
        }else if(confirmPassword != newPassword && oldPassword !=''){
            validator=1;
            let confirmPasswordError = this.refs.confirmPasswordError;
            confirmPasswordError.classList.add("show");
            confirmPasswordError.innerHTML = "New password does not match.";
            setTimeout(function() {
                confirmPasswordError.classList.remove("show");
            }, 3000);
        }else if(phoneNumber1 == ''){
            validator=1;
            let phoneNumberError = this.refs.phoneNumberError;
            phoneNumberError.classList.add("show");
            phoneNumberError.innerHTML = "Please enter a valid phone number.";
            setTimeout(function() {
                phoneNumberError.classList.remove("show");
            }, 3000);
        }else if (phoneNumber1.length < 8) {
            validator=1;
            let phoneNumberError = this.refs.phoneNumberError;
            phoneNumberError.classList.add("show");
            phoneNumberError.innerHTML = "Please enter a valid phone number.";
            setTimeout(function() {
                phoneNumberError.classList.remove("show");
            }, 3000);
        }else if (phoneNumber1.charAt(0) !='9' && phoneNumber1.charAt(0) !='3' && phoneNumber1.charAt(0) !='8' && phoneNumber1.charAt(0) !='7' && phoneNumber1.charAt(0) !='2') {
            validator=1;
            let phoneNumberError = this.refs.phoneNumberError;
            phoneNumberError.classList.add("show");
            phoneNumberError.innerHTML = "Please enter a valid phone number.";
            setTimeout(function() {
                phoneNumberError.classList.remove("show");
            }, 3000);
        }else if(address1 == ''){
            validator=1;
            let addressError = this.refs.addressError;
            addressError.classList.add("show");
            addressError.innerHTML = "Please enter a valid address.";
            setTimeout(function() {
                addressError.classList.remove("show");
            }, 3000);
        }else if(phoneNumber2 != ''){
            if (phoneNumber2.length < 8) {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }else if (phoneNumber2.charAt(0) !='9' && phoneNumber2.charAt(0) !='3' && phoneNumber2.charAt(0) !='8' && phoneNumber2.charAt(0) !='7' && phoneNumber2.charAt(0) !='2') {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }
        }else if(phoneNumber3 != ''){
            if (phoneNumber3.length < 8) {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }else if (phoneNumber3.charAt(0) !='9' && phoneNumber3.charAt(0) !='3' && phoneNumber3.charAt(0) !='8' && phoneNumber3.charAt(0) !='7' && phoneNumber3.charAt(0) !='2') {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }
        }else if(phoneNumber4 != ''){
            if (phoneNumber4.length < 8) {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }else if (phoneNumber4.charAt(0) !='9' && phoneNumber4.charAt(0) !='3' && phoneNumber4.charAt(0) !='8' && phoneNumber4.charAt(0) !='7' && phoneNumber4.charAt(0) !='2') {
                validator=1;
                let phoneNumberError = this.refs.phoneNumberError;
                phoneNumberError.classList.add("show");
                phoneNumberError.innerHTML = "Additional phone number doesn't match the requirements.";
                setTimeout(function() {
                    phoneNumberError.classList.remove("show");
                }, 3000);
            }
        }





        if(!validator){
            /**
             * TODO: Modifcar Perfil
             */
            this.props.history.push("/menu");
        }


    }

    disableAccount() {
        /**
         * TODO: Desabilitar Account
         */
    }

    render() {
        /**
         * TODO: Importar de la DB la info actual del usuario
         */
        return (
            <div className = "principalDiv">
                <form className = "editProfileForm" onSubmit = {this.handleSubmit.bind(this)}>
                <h1>Edit Profile</h1>
                    {/*First Name and Last Name inputs and labels.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>First Name</label>
                            <input ref = "firstName" id = "firstNameId" maxLength='140' placeholder='Enter First Name'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Last Name</label>
                            <input ref="lastName" id = "passwordBox" maxLength='140' placeholder='Enter Last Name'/>
                        </div>
                    </div>
                    {/*First Name and Last Name inputs and labels ends here.*/}
                    {/*New and Confirm Password inputs and labels.*/}
                    <div className = "passBox">

                        <div className = "oldPasswordBox">
                            <label>Old Password</label>
                            <input ref="oldPassword" type="password" id = "oldPasswordId" placeholder='Old Password'/>
                        </div>

                        <div className = "leftContainerBox">
                            <label>New Password</label>
                            <input ref="newPassword" type="password" id = "newPasswordId" placeholder='New Password'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Confirm Password</label>
                            <input ref="confirmPassword" type="password" id = "confirmPasswordId" placeholder='Confirm Password'/>
                        </div>
                    </div>
                    {/*New and Confirm Password inputs and labels end here.*/}

                    {/*First two phone numbers.*/}
                     <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>*Phone Number 1</label>
                            <InputMask ref="phoneNumber1" mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Phone Number 2</label>
                            <InputMask ref="phoneNumber2" mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                    </div>
                    {/*First two phone numbers end here.*/}

                    {/*Last two phone numbers.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Phone Number 3</label>
                            <InputMask ref="phoneNumber3" mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Phone Number 4</label>
                            <InputMask ref="phoneNumber4" mask="9999-9999" placeholder='Enter Phone Number'/>
                        </div>
                    </div>
                    {/*Last two phone numbers end here.*/}

                    {/*First two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>*Address 1</label>
                            <textarea ref="address1" id = "direction1TextArea" maxLength='140' rows="5" placeholder='Enter Address'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Address 2</label>
                            <textarea ref="address2" id = "direction2TextArea" maxLength='140' rows="5" placeholder='Enter Address'/>
                        </div>
                    </div>
                    {/*First two directions text areas end here.*/}

                    {/*Last two directions text areas.*/}
                    <div className = "containerBox">
                        <div className = "leftContainerBox">
                            <label>Address 3</label>
                            <textarea ref="address3" id = "direction3TextArea" maxLength='140' rows="5" placeholder='Enter Address'/>
                        </div>
                        <div className = "rightContainerBox">
                            <label>Address 4</label>
                            <textarea ref="address4" id = "direction4TextArea" maxLength='140' rows="5" placeholder='Enter Address'/>
                        </div>
                    </div>
                    {/*Last two directions text areas end here.*/}

                     <div className = "Buttons">
                            <button className = "disableAccBtn" onClick={this.disableAccount.bind(this)}>Disable Account</button>
                            <label className = "spaceLabel"></label>
                            <button className = "saveChangesBtn" onClick={this.onSubmit.bind(this)}>Save Changes</button>
                    </div>


                    <div ref="firstNameError" id="firstNameError" ></div>
                    <div ref="lastNameError" id="lastNameError"></div>
                    <div ref="oldPasswordError" id="oldPasswordError"></div>
                    <div ref="newPasswordError" id="newPasswordError"></div>
                    <div ref="confirmPasswordError" id="confirmPasswordError"></div>
                    <div ref="phoneNumberError" id="phoneNumberError" ></div>
                    <div ref="addressError" id="addressError"></div>

                </form>
            </div>
        );
    }

}

export default createContainer(() => {
  return { user: Meteor.user() };
},  EditProfilePage);
