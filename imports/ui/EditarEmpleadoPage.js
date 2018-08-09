import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';
import '../client/styles/editEmpleado';

export default class editarEmpleadoPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        users: []
      }
  }

  searchEmployeeSubmit(e) {
    e.preventDefault();
    console.log("Search Employee");
    let parameters = this.refs.valueToQuery.value;
    const usersFound = Meteor.call('query.User', parameters);
    console.log(usersFound);
    this.setState({ usersFound });
    }

  onAgregar() {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  }

  onEliminar() {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  }

  closeAgregar() {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }

  closeModificar() {
    var modal = document.getElementById('simpleModal2');
    modal.style.display = 'none';
  }
  
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
    this.usersTracker = Tracker.autorun(() => {
      Meteor.subscribe('users');
      const users = Meteor.users.find().fetch();
      this.setState({ users });
    });
  }

  componentWillUnmount() {
    this.usersTracker.stop();
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="EditarEmpleado">
        <div className="containerPrincipal">
            <div className="Buttons">
              <button className="botonAgregar" onClick={this.onAgregar.bind(this)}>Agregar Empleado</button>
            </div>
            
            <div className="searchBarDiv">   
              <input 
                id="filterInput" 
                onKeyUp={this.filterNames.bind(this)} 
                placeholder="Buscar Empleado..."
                type="text"  
              />
              <ul className="collection with-header" id="names">
                {renderUser(this.state.users)}
              </ul>
            </div>
            
            {/*Modal*/}
            <div className="modal" id="simpleModal">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                  <div className="modal-header-Btn">
                    <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
                  </div>
                  <div className="modal-header-Name">
                    <h2>Agregar Empleado</h2>
                  </div>
                 </div>
                {/* Body */}
                <div className="modal-body">
                  <form className="agregarEmpleadoFormModal">
                    <div>
                      <div className="container1">
                        <div className="box1">
                          <p>
                            <label>Email</label>
                            <input id = "correo" maxLength='140' placeholder='Ingrese su correo.'  type="email"/>
                          </p>
                        </div>
                      </div>
                      <div className="container1">
                        <div className="box1">
                          <p>
                            <label>Contraseña</label>
                            <input placeholder='Ingrese su contraseña.'  type="password"/>
                          </p>
                        </div>
                        <div className="box2">
                          <p>
                            <label>Confirmar Contraseña</label>
                            <input placeholder='Confirmar contraseña.' ref="confirmPassword" type="password"/>
                          </p>
                        </div>
                      </div>
                      <div className="container1">
                        <div className="box1">
                          <p>
                            <label>Primer Nombre</label>
                            <input maxLength='140' placeholder='Ingrese su primer nombre.' ref="firstName" type="text" />
                          </p>
                        </div>
                        <div className="box2">
                          <p>
                            <label>Apellido</label>
                            <input maxLength='140' placeholder='Ingrese su apellido.' ref="lastName" type="text"/>
                           </p>
                        </div>
                      </div>
                      <div className="container1">
                        <div className="box1">
                          <p>
                            <label>Número de Teléfono</label>
                             <InputMask id = "numero" mask="9999-9999" placeholder='Ingrese su número de teléfono.' ref="phoneNumber"/>
                          </p>
                        </div>
                      </div>
                      <div className="container1">
                        <div className="box1">
                          <p>
                            <label>Dirección</label>
                            <textarea maxLength='140' placeholder='Ingrese su dirección.' ref="address" rows="5"></textarea>
                          </p>
                        </div>
                      </div>
                      <p>
                        <button className="confirmarAdd" >Confirmar</button>
                      </p>
                    </div>
                  </form>
                </div>
                {/* Footer */}
                <div className="modal-footer"></div>
              </div>
            </div> {/*Termina MODAL AGREGAR*/}

            {/*Modal*/}
            <div id="simpleModal2" className="modal">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header-Btn">
                        <span className="closeBtn" onClick={this.closeModificar.bind(this)}>&times;</span>
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
                              <input id = "firstNameId" maxLength='140' placeholder='Ingrese primer nombre.' ref = "firstName"/>
                            </p>
                          </div>
                          <div className="box2">
                            <p>
                              <label>Apellido</label>
                              <input maxLength='140' placeholder='Ingrese su apellido.' ref="lastName" type="text"/>
                             </p>
                          </div>
                        </div>
                        <div className="container1">
                          <div className="box1">
                            <p>
                              <label>*Teléfono 1</label>
                              <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber1"/>
                              <label>Teléfono 3</label>
                              <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber3"/>
                            </p>
                          </div>
                          <div className="box2">
                            <p>
                              <label>Teléfono 2</label>
                              <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber2"/>
                              <label>Teléfono 4</label>
                              <InputMask mask="9999-9999" placeholder='Ingrese su teléfono.' ref="phoneNumber4"/>
                            </p>
                          </div>
                        </div>
                        <div className="container1">
                          <div className="box1">
                            <p>
                              <label>*Dirección 1</label>
                              <textarea id = "direction1TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address1" rows="5"/>
                              <label>Dirección 3</label>
                              <textarea id = "direction3TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address3" rows="5"/>
                            </p>
                          </div>
                          <div className="box2">
                            <p>
                              <label>Dirección 2</label>
                              <textarea id = "direction2TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address2" rows="5"/>
                              <label>Dirección 4</label>
                              <textarea id = "direction4TextArea" maxLength='140' placeholder='Ingrese su dirección.' ref="address4" rows="5"/>
                            </p>
                          </div>
                        </div>  
                        <div className="container1">
                          <div className="box1">
                            <p>
                              <button className = "confirmarModificar" >Confirmar Cambios</button>
                            </p>
                          </div>
                          <div className="box2">
                            <p>
                              <button className = "confirmarDesactivar" >Desactivar Empleado</button>
                            </p>
                          </div>
                        </div>     
                      </div>       
                    </form>
                  </div>
                  {/* Footer */}
                  <div className="modal-footer"></div>
                  </div>
                </div>{/*Termina MODAL MODIFICAR*/}
            </div>
        </div>
      );
  }
}

const renderUser = (users) => {
    return users.map((user) => {
        return (
            <li  onClick={function () {
                var modal = document.getElementById('simpleModal2');
                modal.style.display = 'block';x
            }} className="collection-item" key={user._id}>
                <a href="#"  className="hrefNombre">{user.profile.firstName} {user.profile.lastName}</a>
            </li>
        )
    });
}
