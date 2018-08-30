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
    } else if (phoneNumber1.includes('_')) {
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
      let user = {
        email,
        password,
        profile
      };
      Meteor.call('users.initializeClient', user, (err) => {
        if (err) {
          // alert(err.reason);  
          if(err.reason.includes("Email already exists")){
            toastr.warning(err.reason);
          }else{
            toastr.warning('Hubo un problema al momento de crear su cuenta.');
          }
          
          
        } else {
          toastr.success('Se registró el usuario exitosamente.');
          console.log(Meteor.userId());
          this.changeToLogin();
        }
      });

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
            <div className="image" />
            <form onSubmit={this.handleSubmit.bind(this)}>
              <p>
                <label>Correo Electrónico</label>
                <input
                  ref="email"
                  type="email"
                  placeholder="Ingrese su correo electrónico."
                  maxLength="140"
                />
              </p>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>Contraseña</label>
                    <input
                      ref="password"
                      type="password"
                      placeholder="Ingrese su contraseña."
                    />
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Confirmar Contraseña</label>
                    <input
                      ref="confirmPassword"
                      type="password"
                      placeholder="Confirme su contraseña."
                    />
                  </p>
                </div>
              </div>
              <div className="container-1">
                <div className="box-1">
                  <p>
                    <label>Primer Nombre</label>
                    <input
                      ref="firstName"
                      type="text"
                      placeholder="Ingrese su primer nombre."
                      maxLength="140"
                    />
                  </p>
                </div>
                <div className="box-2">
                  <p>
                    <label>Apellido</label>
                    <input
                      ref="lastName"
                      type="text"
                      placeholder="Ingrese su apellido."
                      maxLength="140"
                    />
                  </p>
                </div>
              </div>
              <p>
                <label>Número de Teléfono</label>
                <InputMask
                  mask="9999-9999"
                  ref="phoneNumber"
                  placeholder="Ingrese su número de teléfono."
                />
              </p>
              <p>
                <label>Dirección</label>
                <textarea
                  ref="address"
                  rows="5"
                  placeholder="Ingrese su dirección."
                  maxLength="140"
                />
              </p>
              <p>
                <button onClick={this.onSubmit.bind(this)}>Registrarse</button>
              </p>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
