import { Meteor } from 'meteor/meteor';
import React from 'react';
import InputMask from 'react-input-mask';
import '../client/styles/editEmpleado';

let userGlobal;

export default class editarEmpleadoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  /*Este es el método que se corre cuando se oprime el boton
  de agrgear empleado.*/
  onAgregarEmpleado() {
    this.refs.email.value = "";
    this.refs.passwordAgregar.value = "";
    this.refs.confirmPasswordAgregar.value = "";
    this.refs.firstNameAgregar.value = "";
    this.refs.lastNameAgregar.value = "";
    this.refs.phoneNumberAgregar.value = "";
    this.refs.addressAgregar.value = ""; 
    var modal = document.getElementById('ModalAgregarEmpleado');
    modal.style.display = 'block';
  }

  /*Este es el método que se corre cuando se cierra el modal de 
  agregar empleado.*/
  closeAgregarEmpleado() {
    var modal = document.getElementById('ModalAgregarEmpleado');
    modal.style.display = 'none';
    this.refs.email.value = "";
    this.refs.passwordAgregar.value = "";
    this.refs.confirmPasswordAgregar.value = "";
    this.refs.firstNameAgregar.value = "";
    this.refs.lastNameAgregar.value = "";
    this.refs.phoneNumberAgregar.value = "";
    this.refs.addressAgregar.value = ""; 
  }

  /*Este es el método que se corre cuando se cierra el modal de 
  modificar empleado.*/
  closeModificarEmpleado() {
    var modal = document.getElementById('ModalModificarEmpleado');
    modal.style.display = 'none';
    this.refs.firstNameMod.value = '';
    this.refs.lastNameMod.value = '';
    this.refs.phoneNumber1Mod.value = '';
    this.refs.phoneNumber2Mod.value = '';
    this.refs.phoneNumber3Mod.value = '';
    this.refs.phoneNumber4Mod.value = '';
    this.refs.address1Mod.value = '';
    this.refs.address2Mod.value = '';
    this.refs.address3Mod.value = '';
    this.refs.address4Mod.value = '';
  }

  /*Este es el método que permite que el administrador busque en la lista
  escribiendo el nombre del empleado.*/  
  filterNames() {
    //Get value of input
    let filterValue = document.getElementById('filterInput').value.toUpperCase();
    // console.log(filterValue);
    //Get names ul
    let ul = document.getElementById('names');
    // Get li from Ul
    //grab things by classes  and puts them in an array
    let li = ul.querySelectorAll('li.collection-item');
    // console.log(li);
    //Loop through collection-item lis
    for (let i = 0; i < li.length; i++) {
      let a = li[i].getElementsByTagName('a')[0]; //get current link
      // console.log(a);
      // if matched
      if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.usersTracker = Tracker.autorun(() => {
        Meteor.subscribe('users.getEmployees');
        const users = Meteor.users.find({_id: {$not: Meteor.userId()}}).fetch();
        this.setState({users});
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.usersTracker.stop();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  /*Este es el método que se corre cuando se cambia el indice seleccionado
  en el combo box.*/
  handleChangeCBox(e) {
    var index = e.nativeEvent.target.selectedIndex;
    if (index == 1) {
      this.props.history.push('/editAdmins');
    } 
    if (index == 2) {
      this.props.history.push('/editUsuarios');
    }
  }

  /*Este es el método que carga y muestra la lista de empleados.*/
  loadList() {
    return this.state.users.map((user) => {
      return (
        <li  onClick={(e) => {
          this.cargarInfoModificar(user);
        }} className="collection-item" key={user._id}>
          <a href="#"  className="hrefNombre">{user.profile.firstName + ' ' + user.profile.lastName}</a>
        </li>
      )
    })
  }

  /*Este es el método que carga la informacion del empleado seleccionado para 
  modificacion.*/
  cargarInfoModificar(user) {
    userGlobal = user;
    $('#phoneNumber1Mod').val(user.profile.phoneNumber1);
    $('#phoneNumber2Mod').val(user.profile.phoneNumber2);
    $('#phoneNumber3Mod').val(user.profile.phoneNumber3);
    $('#phoneNumber4Mod').val(user.profile.phoneNumber4);
    this.refs.firstNameMod.value = user.profile.firstName;
    this.refs.lastNameMod.value = user.profile.lastName;
    this.refs.phoneNumber1Mod.value = user.profile.phoneNumber1;
    this.refs.phoneNumber2Mod.value = user.profile.phoneNumber2;
    this.refs.phoneNumber3Mod.value = user.profile.phoneNumber3;
    this.refs.phoneNumber4Mod.value = user.profile.phoneNumber4;
    this.refs.address1Mod.value = user.profile.address1;
    this.refs.address2Mod.value = user.profile.address2;
    this.refs.address3Mod.value = user.profile.address3;
    this.refs.address4Mod.value = user.profile.address4;
    var modal = document.getElementById('ModalModificarEmpleado');
    modal.style.display = 'block';
  }

  /*Este es el método que se corre cuando se oprime el boton de confirmar cambios
  al momento de modificar un empleado.*/
  onSubmitModificarEmpleado(){
    let firstName = this.refs.firstNameMod.value;
    let lastName = this.refs.lastNameMod.value;
    let phoneNumber1 = this.refs.phoneNumber1Mod.value;
    let phoneNumber2 = this.refs.phoneNumber2Mod.value;
    let phoneNumber3 = this.refs.phoneNumber3Mod.value;
    let phoneNumber4 = this.refs.phoneNumber4Mod.value;
    let address1 = this.refs.address1Mod.value;
    let address2 = this.refs.address2Mod.value;
    let address3 = this.refs.address3Mod.value;
    let address4 = this.refs.address4Mod.value;

    //Validaciones
    let validator = 0;
    //Validar email
    if (firstName == '' || firstName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un nombre válido.');
    } else if (lastName == '' || lastName.match(/[^a-z]/gi)) {
      validator = 1;
      toastr.warning('Por favor ingrese un apellido válido.');
    } else if (phoneNumber1 == '') {
      validator = 1;
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
    } else if (phoneNumber1.includes("_")) {
      validator = 1;
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
    } else if (
      phoneNumber1.charAt(0) != '9' &&
      phoneNumber1.charAt(0) != '3' &&
      phoneNumber1.charAt(0) != '8' &&
      phoneNumber1.charAt(0) != '7' &&
      phoneNumber1.charAt(0) != '2'
    ) {
      validator = 1;
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
    } else if (address1 == '') {
      validator = 1;
      toastr.warning('Por favor ingrese una dirección válida.');
    }

    if (phoneNumber2 != '') {
      if (phoneNumber2.includes("_")) {
        validator = 1;
        toastr.warning('Por favor ingrese un segundo número de teléfono válido.');
      } else if (
        phoneNumber2.charAt(0) != '9' &&
        phoneNumber2.charAt(0) != '3' &&
        phoneNumber2.charAt(0) != '8' &&
        phoneNumber2.charAt(0) != '7' &&
        phoneNumber2.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('Por favor ingrese un segundo número de teléfono válido.');
      }
    }

    if (phoneNumber3 != '') {
      if (phoneNumber3.includes("_")) {
        validator = 1;
        toastr.warning('Por favor ingrese un tercer número de teléfono válido.');
      } else if (
        phoneNumber3.charAt(0) != '9' &&
        phoneNumber3.charAt(0) != '3' &&
        phoneNumber3.charAt(0) != '8' &&
        phoneNumber3.charAt(0) != '7' &&
        phoneNumber3.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('Por favor ingrese un tercer número de teléfono válido.');
      }
    }

    if (phoneNumber4 != '') {
      if (phoneNumber4.includes("_")) {
        validator = 1;
        toastr.warning('Por favor ingrese un cuarto número de teléfono válido.');
      } else if (
        phoneNumber4.charAt(0) != '9' &&
        phoneNumber4.charAt(0) != '3' &&
        phoneNumber4.charAt(0) != '8' &&
        phoneNumber4.charAt(0) != '7' &&
        phoneNumber4.charAt(0) != '2'
      ) {
        validator = 1;
        toastr.warning('Por favor ingrese un cuarto número de teléfono válido.');
      }
    }
    if (!validator) {
      Meteor.call('users.update', userGlobal._id, {
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
      toastr.success('Se ha modificado el empleado exitosamente.');
      this.closeModificarEmpleado();
    }
  }

  /*Este es el método que muestra el modal de estar seguro de 
  borrar empleado.*/
  onDeleteEmpleado() {
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'block';
  }

  /*Este es el método que cierra el modal de estar seguro de 
  borrar empleado.*/
  closeDeleteModal() {
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'none';
  }

  /*Este es el método que se corre cuando se oprime el boton de eliminar
  empleado.*/
  borrarEmpleado() {
    Meteor.call('users.delete', userGlobal._id);
    toastr.success('Se ha eliminado el empleado exitosamente.');
    this.closeDeleteModal();
    this.closeModificarEmpleado();
  }

  /*Este es el método que se corre cuando se oprime el boton de Confirmar en el
  modal de Agregar Empleado.*/
  onSubmitAgregar() {
    let email = this.refs.email.value.trim().toLowerCase();
    let password = this.refs.passwordAgregar.value.trim();
    let confirmPassword = this.refs.confirmPasswordAgregar.value.trim();
    let firstName = this.refs.firstNameAgregar.value.trim();
    let lastName = this.refs.lastNameAgregar.value.trim();
    let phoneNumber1 = this.refs.phoneNumberAgregar.value.trim();
    let address1 = this.refs.addressAgregar.value.trim();
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
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
    } else if (phoneNumber1.includes("_")) {
      validator = 1;
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
    } else if (
      phoneNumber1.charAt(0) != '9' &&
      phoneNumber1.charAt(0) != '3' &&
      phoneNumber1.charAt(0) != '8' &&
      phoneNumber1.charAt(0) != '7' &&
      phoneNumber1.charAt(0) != '2'
    ) {
      validator = 1;
      toastr.warning('Por favor ingrese un primer número de teléfono válido.');
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
      Meteor.call('users.initializeEmployee', user, (err, returnValue) => {
        if (err) {
          if(err.reason.includes("Email already exists")){
            toastr.warning('El correo que ingresó ya existe.');
          }else{
            toastr.warning('Hubo un problema al momento de crear su cuenta.');
          }
        } else {
          if (returnValue == 1) {
            toastr.success('Se ha agregado el empleado exitosamente.');
            this.closeAgregarEmpleado();
          } else {
            toastr.warning('No tiene privilegios de administrador. No se ha creado el empleado.');       
          }   
        }
      });
    }
  }
  
  render() {
    return (
      <div className="EditarEmpleado">
        <div className="containerPrincipal">
        
          <div className = "ComboBox">
            <select onChange ={this.handleChangeCBox.bind(this)}>
              <option value="Empleados">Empleados</option>
              <option value="Administradores">Administradores</option>
              <option value="Usuarios">Clientes</option>
            </select>
          </div>

          <div className="Buttons">
            <button className="botonAgregar" onClick={this.onAgregarEmpleado.bind(this)}>Agregar Empleado</button>
          </div>  

          <div className="searchBarDiv">   
            <input id="filterInput" onKeyUp={this.filterNames.bind(this)} placeholder="Buscar Empleado..." type="text"/>
            <ul className="collection with-header" id="names">
              {this.loadList()}
            </ul>
          </div>

          {/*Modal Agregar Empleado*/}
          <div className="modal" id="ModalAgregarEmpleado">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-header-Btn">
                  <span className="closeBtn" onClick={this.closeAgregarEmpleado.bind(this)}>&times;</span>
                </div>
                <div className="modal-header-Name">
                  <h2>Agregar Empleado</h2>
                </div>
              </div>
              {/* Body */}
              <div className="modal-body">
                <form className="agregarEmpleadoFormModal" onSubmit={this.handleSubmit.bind(this)}>
                  <div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>Email</label>
                          <input id = "correo" maxLength='140' placeholder='Ingrese su correo.'  type="email" ref = "email"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>Contraseña</label>
                          <input placeholder='Ingrese su contraseña.'  type="password" ref = "passwordAgregar"/>
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <label>Confirmar Contraseña</label>
                          <input placeholder='Confirmar contraseña.' ref="confirmPasswordAgregar" type="password"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>Primer Nombre</label>
                          <input ref="firstNameAgregar" maxLength='140' placeholder='Ingrese su primer nombre.'  type="text" />
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <label>Apellido</label>
                          <input maxLength='140' placeholder='Ingrese su apellido.' ref="lastNameAgregar" type="text"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>Número de Teléfono</label>
                          <InputMask id = "numero" mask="9999-9999" placeholder='Ingrese su número de teléfono.' ref="phoneNumberAgregar"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>Dirección</label>
                          <textarea maxLength='140' placeholder='Ingrese su dirección.' ref="addressAgregar" rows="5"></textarea>
                        </p>
                      </div>
                    </div>
                    <p>
                      <button className="confirmarAdd" onClick={this.onSubmitAgregar.bind(this)}>Confirmar</button>
                    </p>
                  </div>
                </form>
              </div>
              {/* Footer */}
              <div className="modal-footer"></div>
            </div>
          </div> {/*Termina MODAL AGREGAR*/}

          {/*Modal de Modificar Empleado*/}
          <div id="ModalModificarEmpleado" className="modal">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-header-Btn">
                  <span className="closeBtn" onClick={this.closeModificarEmpleado.bind(this)}>&times;</span>
                </div>
                <div className="modal-header-Name">
                  <h2>Modificar Empleado</h2>
                </div>
              </div>
              {/* Body */}
              <div className="modal-body">
                <form  className="agregarEmpleadoFormModal">
                  <div>
                    <div className = "container1">
                      <div className = "box1">
                        <p>
                          <label>Primer Nombre</label>
                          <input id = "firstNameId" maxLength='140' placeholder='Ingrese primer nombre.' ref = "firstNameMod"/>
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <label>Apellido</label>
                          <input maxLength='140' placeholder='Ingrese su apellido.' ref="lastNameMod" type="text"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          
                          <label>*Teléfono 1</label>
                          <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber1Mod" id = "phoneNumber1Mod"/>
                         
                          <label>Teléfono 3</label>
                          <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber3Mod" id = "phoneNumber3Mod"/>
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <label>Teléfono 2</label>
                          <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber2Mod" id = "phoneNumber2Mod"/>
                          <label>Teléfono 4</label>
                          <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber4Mod" id = "phoneNumber4Mod"/>
                        </p>
                      </div>
                    </div>
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <label>*Dirección 1</label>
                          <textarea id = "direction1TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address1Mod" rows="5"/>
                          <label>Dirección 3</label>
                          <textarea id = "direction3TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address3Mod" rows="5"/>
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <label>Dirección 2</label>
                          <textarea id = "direction2TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address2Mod" rows="5"/>
                          <label>Dirección 4</label>
                          <textarea id = "direction4TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address4Mod" rows="5"/>
                        </p>
                      </div>
                    </div>  
                    <div className="container1">
                      <div className="box1">
                        <p>
                          <button className = "confirmarModificar" onClick={this.onSubmitModificarEmpleado.bind(this)}>Confirmar Cambios</button>
                        </p>
                      </div>
                      <div className="box2">
                        <p>
                          <button className = "confirmarDesactivar" onClick={this.onDeleteEmpleado.bind(this)} >Borrar Empleado</button>
                        </p>
                      </div>
                    </div>     
                  </div>       
                </form>
              </div>
              {/* Footer */}
              <div className="modal-footer"></div>
            </div>
          </div>{/*Termina MODAL MODIFICAR EMPLEADO*/}

           {/* <!-- Modal --> */}
          <div className="modal" id="exampleModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                </div>
                <div className="modal-body">
                  <p>¿Desea borrar el empleado?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={this.closeDeleteModal.bind(this)}>Cancelar</button>
                  <button className="btn btn-danger" onClick={this.borrarEmpleado.bind(this)}>Borrar</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}