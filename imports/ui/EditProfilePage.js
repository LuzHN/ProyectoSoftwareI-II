import { Meteor } from 'meteor/meteor';
import React from 'react';
import InputMask from 'react-input-mask';
import { createContainer } from 'meteor/react-meteor-data';
import '../client/styles/EditProfile.css';


class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(e) {
    e.preventDefault();
  }

  /*Se carga la informacion del user*/
  componentDidMount() {

    let user;
    let firstName;
    let lastName;
    let phoneNumber1;
    let phoneNumber2;
    let phoneNumber3;
    let phoneNumber4;
    let address1;
    let address2;
    let address3;
    let address4;
    /*El SetTimeout se utiliza para darle tiempo a Meteor de cargar la informacion del user*/
    setTimeout(() => {
      user = Meteor.user() ? Meteor.user().profile : '';
      console.log(user);
      firstName = user.firstName;
      lastName = user.lastName;
      phoneNumber1 = user.phoneNumber1;
      phoneNumber2 = user.phoneNumber2;
      phoneNumber3 = user.phoneNumber3;
      phoneNumber4 = user.phoneNumber4;
      address1 = user.address1;
      address2 = user.address2;
      address3 = user.address3;
      address4 = user.address4;
      // console.log("firstName: " + firstName);
      // console.log("lastName: " + lastName);
      // console.log("phoneNumber1: " + phoneNumber1);
      // console.log("phoneNumber2: " + phoneNumber2);
      // console.log("phoneNumber3: " + phoneNumber3);
      // console.log("phoneNumber4: " + phoneNumber4);
      // console.log("address1: " + address1);
      // console.log("address2: " + address2);
      // console.log("address3: " + address3);
      // console.log("address4: " + address4);
      this.refs.firstName.value = firstName;
      this.refs.lastName.value = lastName;
      /* Se aplica el jquery para que se visualicen los valores antes que los cargue con ref 
      * (ya que con ref solo cargan hasta que se le de click al InputMask ) 
      * */
      $('#phoneNumber1').val(phoneNumber1);
      $('#phoneNumber2').val(phoneNumber2);
      $('#phoneNumber3').val(phoneNumber3);
      $('#phoneNumber4').val(phoneNumber4);
      this.refs.phoneNumber1.value = phoneNumber1;
      this.refs.phoneNumber2.value = phoneNumber2;
      this.refs.phoneNumber3.value = phoneNumber3;
      this.refs.phoneNumber4.value = phoneNumber4;
      this.refs.address1.value = address1;
      this.refs.address2.value = address2;
      this.refs.address3.value = address3;
      this.refs.address4.value = address4;

    }, 1000);




  }

  componentWillUnmount() {

  }

  /** Se guarda la info de los inputs,se validan y se hace el update de la informacion del user*/
  onSubmit() {
    let firstName = this.refs.firstName.value.trim();
    let lastName = this.refs.lastName.value.trim();
    // let oldPassword = this.refs.oldPassword.value.trim();
    // let newPassword = this.refs.newPassword.value.trim();
    // let confirmPassword = this.refs.confirmPassword.value.trim();
    let phoneNumber1 = this.refs.phoneNumber1.value.trim();
    let phoneNumber2 = this.refs.phoneNumber2.value.trim();
    let phoneNumber3 = this.refs.phoneNumber3.value.trim();
    let phoneNumber4 = this.refs.phoneNumber4.value.trim();
    let address1 = this.refs.address1.value.trim();
    let address2 = this.refs.address2.value.trim();
    let address3 = this.refs.address3.value.trim();
    let address4 = this.refs.address4.value.trim();


    /**
     * Nota: Falta validar que la vieja contraseña sea la misma que tenia antes
     */

    //Validaciones
    let validator = 0;

    if (firstName == '' || firstName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un nombre válido.');
    } else if (lastName == '' || lastName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un nombre válido.');
    }
    // else if (newPassword != '' && oldPassword == '') {
    //   validator = 1;
    //   toastr.warning('No ingresó la clave vieja.');
    // } 
    // else if (newPassword.length < 9 && oldPassword != '') {
    //   validator = 1;
    //   toastr.warning('La contraseña debe de ser de al menos 9 dígitos.');
    // } 
    // else if (confirmPassword != newPassword && oldPassword != '') {
    //   validator = 1;
    //   toastr.warning('Las claves no son las mismas.')
    // } 
    else if (phoneNumber1 == '') {
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
    if (phoneNumber2 != '') {
      if (phoneNumber2.includes('_')) {

        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      } else if (
        phoneNumber2.charAt(0) != '9' &&
        phoneNumber2.charAt(0) != '3' &&
        phoneNumber2.charAt(0) != '8' &&
        phoneNumber2.charAt(0) != '7' &&
        phoneNumber2.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      }
    }
    if (phoneNumber3 != '') {
      if (phoneNumber3.includes('_')) {
        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      } else if (
        phoneNumber3.charAt(0) != '9' &&
        phoneNumber3.charAt(0) != '3' &&
        phoneNumber3.charAt(0) != '8' &&
        phoneNumber3.charAt(0) != '7' &&
        phoneNumber3.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      }
    }
    if (phoneNumber4 != '') {
      if (phoneNumber4.includes('_')) {
        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      } else if (
        phoneNumber4.charAt(0) != '9' &&
        phoneNumber4.charAt(0) != '3' &&
        phoneNumber4.charAt(0) != '8' &&
        phoneNumber4.charAt(0) != '7' &&
        phoneNumber4.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('El número adicional no cumple con los requerimientos.');
      }
    }


    if (!validator) {
      Meteor.call('users.updateProfileSelf', {
        firstName,
        lastName,
        phoneNumber1,
        phoneNumber2,
        phoneNumber3,
        phoneNumber4,
        address1,
        address2,
        address3,
        address4
      });
      toastr.success('Perfil Modificado.');
      this.props.history.push('/');
    }
  }

  /**Carga el Modal para confirmar el delete de user */
  disableAccount() {
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'block';
  }

  /**Se borra el user de la DB */
  deleteUserFinal() {
    Meteor.call('users.deleteSelf');
    toastr.error('Cuenta Desactivada.');
    this.props.history.push('/');
    this.closeDeleteModal();
  }

  /**Metodo para cerrar el modal de confirmacion para delete user */
  closeDeleteModal() {
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'none';
  }

  render() {
    /**
     * TODO: Importar de la DB la info actual del usuario
     */
    return (
      <div className="principalDiv">
        <form
          className="editProfileForm"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <h1>Editar Perfil</h1>
          {/*First Name and Last Name inputs and labels.*/}
          <div className="containerBox">
            <div className="leftContainerBox">
              <label>Nombre</label>
              <input ref="firstName" id="firstName" maxLength="140" placeholder="Ingrese primer nombre." />
            </div>
            <div className="rightContainerBox">
              <label>Apellido</label>
              <input ref="lastName" id="lastName" maxLength="140" placeholder="Ingrese apellido." />
            </div>
          </div>
          {/*First Name and Last Name inputs and labels ends here.*/}
          {/*New and Confirm Password inputs and labels.*/}
          {/* <div className="passBox">
            <div className="oldPasswordBox">
              <label>Contraseña Vieja</label>
              <input
                ref="oldPassword"
                type="password"
                id="oldPasswordId"
                placeholder="Contraseña vieja."
              />
            </div>

            <div className="leftContainerBox">
              <label>Contraseña Nueva</label>
              <input
                ref="newPassword"
                type="password"
                id="newPasswordId"
                placeholder="Contraseña nueva."
              />
            </div>
            <div className="rightContainerBox">
              <label>Confirmar Contraseña</label>
              <input
                ref="confirmPassword"
                type="password"
                id="confirmPasswordId"
                placeholder="Confirmar contraseña."
              />
            </div>
          </div> */}
          {/*New and Confirm Password inputs and labels end here.*/}

          {/*First two phone numbers.*/}
          <div className="containerBox">
            <div className="leftContainerBox">
              <label>*Teléfono 1</label>
              <InputMask ref="phoneNumber1" id="phoneNumber1" mask="9999-9999" placeholder="Ingrese su teléfono." />
            </div>
            <div className="rightContainerBox">
              <label>Teléfono 2</label>
              <InputMask ref="phoneNumber2" id="phoneNumber2" mask="9999-9999" placeholder="Ingrese su teléfono." />
            </div>
          </div>
          {/*First two phone numbers end here.*/}

          {/*Last two phone numbers.*/}
          <div className="containerBox">
            <div className="leftContainerBox">
              <label>Teléfono 3</label>
              <InputMask ref="phoneNumber3" id="phoneNumber3" mask="9999-9999" placeholder="Ingrese su teléfono." />
            </div>
            <div className="rightContainerBox">
              <label>Teléfono 4</label>
              <InputMask ref="phoneNumber4" id="phoneNumber4" mask="9999-9999" placeholder="Ingrese su teléfono." />
            </div>
          </div>
          {/*Last two phone numbers end here.*/}

          {/*First two directions text areas.*/}
          <div className="containerBox">
            <div className="leftContainerBox">
              <label>*Dirección 1</label>
              <textarea ref="address1" id="address1" maxLength="140" rows="5" placeholder="Ingrese su dirección."></textarea>
            </div>
            <div className="rightContainerBox">
              <label>Dirección 2</label>
              <textarea ref="address2" id="address2" maxLength="140" rows="5" placeholder="Ingrese su dirección." />
            </div>
          </div>
          {/*First two directions text areas end here.*/}

          {/*Last two directions text areas.*/}
          <div className="containerBox">
            <div className="leftContainerBox">
              <label>Dirección 3</label>
              <textarea ref="address3" id="address3" maxLength="140" rows="5" placeholder="Ingrese su dirección." />
            </div>
            <div className="rightContainerBox">
              <label>Dirección 4</label>
              <textarea ref="address4" id="address4" maxLength="140" rows="5" placeholder="Ingrese su dirección." />
            </div>
          </div>
          {/*Last two directions text areas end here.*/}

          <div className="Buttons">


            <button
              className="saveChangesBtn"
              onClick={this.onSubmit.bind(this)}
            >
              Guardar Cambios
            </button>
            <label className="spaceLabel" />
            <button
              className="disableAccBtn"
              onClick={this.disableAccount.bind(this)}
            >
              Desactivar Cuenta
            </button>

          </div>
        </form>

        {/* <!-- Modal --> */}
        <div className="modal" id="exampleModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirmar</h5>
                <button className="close">
                  <span onClick={this.closeDeleteModal.bind(this)}>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Desea Desactivar Cuenta?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.closeDeleteModal.bind(this)}>Cancelar</button>
                <button className="btn btn-danger" onClick={this.deleteUserFinal.bind(this)} >Borrar</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default createContainer(() => {
  return { user: Meteor.user() };
}, EditProfilePage);
