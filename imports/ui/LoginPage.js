import { Meteor } from 'meteor/meteor';
import React from 'react';
import '../client/styles/Login.css';

export default class LoginPage extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  onRegister() {
    //redirigir a pagina register
    this.props.history.push('/register');
  }

  onLogin() {
    /*Metodo para el boton Login*/
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        if (email == '' && password == '') {
          toastr.warning('Por favor ingrese sus datos.');
        } else if (email == '') {
          toastr.warning('Por favor ingrese su correo electrónico.');
        } else if (password == '') {
          toastr.warning('Por favor ingrese su contraseña.');
        } else {
          toastr.warning(
            'Error de confirmación. Por favor ingrese sus datos correctamente.'
          );
        } //Fin del if anidado
      } else {
        toastr.success('Se ha logueado exitosamente.');
        email = '';
        password = '';
        if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
          this.props.history.push('/menuempleado');
        } else if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
          this.props.history.push('/editEmpleado');
        } else if (Roles.userIsInRole(Meteor.userId(), 'client')) {
          this.props.history.push('/');
        }
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <form className="userDataForm" onSubmit={this.handleSubmit.bind(this)}>
          <div className="Image" />

          <label className="emailLabel">Correo Electrónico</label>
          <input
            className="emailInput"
            placeholder="Ingrese su correo electrónico."
            id="emailBox"
            type="email"
            pattern="[^ @]*@[^ @]*"
            ref="email"
          />

          <label className="passwordLabel">Contraseña</label>
          <input
            className="passwordInput"
            placeholder="Ingrese su contraseña."
            id="passwordBox"
            type="password"
            ref="password"
          />

          <div className="Buttons">
            <div className="btn-bg bg-2">
              <div className="btn btn-2">
                <button onClick={this.onLogin.bind(this)}>Login
                </button>
              </div>
            </div>
            <div className="btn-bg bg-3">
              <div className="btn btn-3">
                <button
                  className="registerButton"
                  onClick={this.onRegister.bind(this)}
                >Registrarse </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
