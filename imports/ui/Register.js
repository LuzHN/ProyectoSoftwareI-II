import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import {withRouter} from "react-router-dom";
import InputMask from 'react-input-mask';
import './../client/styles/register';

export default class Register extends React.Component {
  
  handleSubmit(e) {
    e.preventDefault();
  }

  onSubmit() {
    
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let confirmPassword = this.refs.confirmPassword.value.trim();
    let firstName = this.refs.firstName.value.trim();
    let lastName = this.refs.lastName.value.trim();
    let phoneNumber = this.refs.phoneNumber.value.trim();
    let address = this.refs.address.value.trim();



    //Validaciones
    let validator = 0;
    //Validar email
    if(email == ''){
      validator=1;
      let emailError = this.refs.emailError;
      emailError.classList.add("show");
      emailError.innerHTML = "Please enter a valid email.";
      setTimeout(function() {
          emailError.classList.remove("show");
      }, 3000);
    }else if(email.indexOf('@')<=0){
      validator=1;
      let emailError = this.refs.emailError;
      emailError.classList.add("show");
      emailError.innerHTML = "Please enter a valid email.";
      setTimeout(function() {
          emailError.classList.remove("show");
      }, 3000);
    
    }else if(email.charAt(email.length-4)!='.' && email.charAt(email.length-3)!='.'){
      validator=1;
      let emailError = this.refs.emailError;
      emailError.classList.add("show");
      emailError.innerHTML = "Please enter a valid email.";
      setTimeout(function() {
          emailError.classList.remove("show");
      }, 3000);
    }else if(password == ''){
      validator=1;
      let passwordError = this.refs.passwordError;
      passwordError.classList.add("show");
      passwordError.innerHTML = "Password must be 9 digits long.";
      setTimeout(function() {
          passwordError.classList.remove("show");
      }, 3000);
    }else if (password.length < 9) {
      validator=1;
      let passwordError = this.refs.passwordError;
      passwordError.classList.add("show");
      passwordError.innerHTML = "Password must be 9 digits long.";
      setTimeout(function() {
          passwordError.classList.remove("show");
      }, 3000);
    }else if(confirmPassword != password){
      validator=1;
      let passwordError = this.refs.passwordError;
      passwordError.classList.add("show");
      passwordError.innerHTML = "Password does not match.";
      setTimeout(function() {
          passwordError.classList.remove("show");
      }, 3000);
    }else if(firstName == '' ||  firstName.match(/[^a-z]/gi)){
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
    }else if(phoneNumber == ''){
      validator=1;
      let phoneNumberError = this.refs.phoneNumberError;
      phoneNumberError.classList.add("show");
      phoneNumberError.innerHTML = "Please enter a valid phone number.";
      setTimeout(function() {
          phoneNumberError.classList.remove("show");
      }, 3000);
    }else if (phoneNumber.length < 8) {
      validator=1;
      let phoneNumberError = this.refs.phoneNumberError;
      phoneNumberError.classList.add("show");
      phoneNumberError.innerHTML = "Please enter a valid phone number.";
      setTimeout(function() {
          phoneNumberError.classList.remove("show");
      }, 3000);
    }else if (phoneNumber.charAt(0) !='9' && phoneNumber.charAt(0) !='3' && phoneNumber.charAt(0) !='8' && phoneNumber.charAt(0) !='7' && phoneNumber.charAt(0) !='2') {
      validator=1;
      let phoneNumberError = this.refs.phoneNumberError;
      phoneNumberError.classList.add("show");
      phoneNumberError.innerHTML = "Please enter a valid phone number.";
      setTimeout(function() {
          phoneNumberError.classList.remove("show");
      }, 3000);
    }else if(address == ''){
      validator=1;
      let addressError = this.refs.addressError;
      addressError.classList.add("show");
      addressError.innerHTML = "Please enter a valid address.";
      setTimeout(function() {
        addressError.classList.remove("show");
      }, 3000);
    }


    if(!validator){
      Accounts.createUser({ email, password }, (err) =>{
        if (err) {
          console.log('entro aqui');
          alert(err.reason);
        }else {
          console.log('esta pendejada');
          alert('user created');
        }
      });
      this.props.history.push("/menu");
    }

  };

  render(){
    return (
      <div className="container">
        <div className="wrapper">
          <div className="contact">
            <div className="image"></div>​
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <p>
                <label>Email</label>
                <input ref = "email" type="email" placeholder='Enter Email' maxLength='140' />
              </p>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>Password</label>
                    <input ref="password" type="password" placeholder='Enter Password' />                 
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Confirm Password</label>
                    <input ref = "confirmPassword" type="password" placeholder='Confirm Password'/> 
                  </p>
                </div>
              </div>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>First Name</label>
                    <input ref="firstName" type="text" placeholder='Enter First Name' maxLength='140' />
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Last Name</label>
                    <input ref="lastName" type="text" placeholder='Enter Last Name' maxLength='140' /> 
                  </p>
                </div>
              </div>
              <p>
                <label>Phone Number</label>
                <InputMask mask="9999-9999" ref="phoneNumber"  placeholder='Enter Phone Number' />
              </p>
              <p>
                <label>Address</label>
                <textarea  ref="address" rows="5" placeholder='Enter Address' maxLength='140'></textarea>
              </p>
              <p>
                <button onClick={this.onSubmit.bind(this)}>Register</button>
              </p>

              <div ref="emailError" id="emailError"></div>
              <div ref="passwordError" id="passwordError"></div>
              <div ref="confirmPasswordError" id="confirmPasswordError"></div>
              <div ref="firstNameError" id="firstNameError" ></div>
              <div ref="lastNameError" id="lastNameError"></div>
              <div ref="phoneNumberError" id="phoneNumberError" ></div>
              <div ref="addressError" id="addressError"></div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
