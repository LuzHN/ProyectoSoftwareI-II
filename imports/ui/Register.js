import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../client/styles/register.css';

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
    let phoneNumber1 = this.refs.phoneNumber.value.trim();
    let address1 = this.refs.address.value.trim();
    let profile = {
      firstName,
      lastName,
      phoneNumber1,
      phoneNumber2: '',
      phoneNumber3: '',
      phoneNumber4: '',
      address1,
      address2: '',
      address3: '',
      address4: '',
    };

    //Validaciones
    let validator = 0;
    //Validar email
    if (email == '') {
      validator = 1;
      toastr.warning('Por favor ingrese un correo válido.');
    } else if (email.indexOf('@') <= 0) {
      validator = 1;
      toastr.warning('Por favor ingrese un correo válido.');
    } else if (
      email.charAt(email.length - 4) != '.' &&
      email.charAt(email.length - 3) != '.'
    ) {
      validator = 1;
      toastr.warning('Por favor ingrese un correo válido.');
    } else if (password == '') {
      validator = 1;
      toastr.warning('La contraseña debe de ser de al menos 9 dígitos.');
    } else if (password.length < 9) {
      validator = 1;
      toastr.warning('La contraseña debe de ser de al menos 9 dígitos.');
    } else if (confirmPassword != password) {
      validator = 1;
      toastr.warning('Las contraseñas no son iguales.');
    } else if (firstName == '' || firstName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un nombre válido.');
    } else if (lastName == '' || lastName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un apellido válido.');
    } else if (phoneNumber1 == '') {
      validator = 1;
      toastr.warning('Por favor ingrese un número de teléfono válido.');
    } else if (phoneNumber1.length < 8) {
      validator = 1;
      toastr.warning('Por favor ingrese un número de teléfono válido.');
    } else if (
      phoneNumber1.charAt(0) != '9' &&
      phoneNumber1.charAt(0) != '3' &&
      phoneNumber1.charAt(0) != '8' &&
      phoneNumber1.charAt(0) != '7' &&
      phoneNumber1.charAt(0) != '2'
    ) {
      validator = 1;
      toastr.warning('Por favor ingrese un número de teléfono válido.');
    } else if (address1 == '') {
      validator = 1;
      toastr.warning('Por favor ingrese una dirección válida.');
    }

    if (!validator) {
      Accounts.createUser({ email, password, profile }, (err) => {
        if (err) {
          alert(err.reason);
        } else {
          toastr.success('Se registró el usuario exitosamente.');
          console.log(Meteor.userId);
          this.changeToLogin();
        }
      });
      console.log(Meteor.userId());
      Meteor.call('initialize.User',);
    }
  }

  changeToLogin() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <div className="contact">
            <div className="image" />​
            <form onSubmit={this.handleSubmit.bind(this)}>
              <p>
                <label>Email</label>
                <input
                  ref="email"
                  type="email"
                  placeholder="Enter Email"
                  maxLength="140"
                />
              </p>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>Password</label>
                    <input
                      ref="password"
                      type="password"
                      placeholder="Enter Password"
                    />
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Confirm Password</label>
                    <input
                      ref="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </p>
                </div>
              </div>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>First Name</label>
                    <input
                      ref="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      maxLength="140"
                    />
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Last Name</label>
                    <input
                      ref="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      maxLength="140"
                    />
                  </p>
                </div>
              </div>
              <p>
                <label>Phone Number</label>
                <InputMask
                  mask="9999-9999"
                  ref="phoneNumber"
                  placeholder="Enter Phone Number"
                />
              </p>
              <p>
                <label>Address</label>
                <textarea
                  ref="address"
                  rows="5"
                  placeholder="Enter Address"
                  maxLength="140"
                />
              </p>
              <p>
                <button onClick={this.onSubmit.bind(this)}>Register</button>
              </p>
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}
