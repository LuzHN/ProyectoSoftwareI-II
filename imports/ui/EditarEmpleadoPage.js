import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';

import './../client/styles/editEmpleado';

export default class editarEmpleadoPage extends React.Component {

    searchEmployeeSubmit(e) {
        e.preventDefault();
        console.log("Search Employee");
    }

    onAgregar() {
       console.log("Agrego");
       var modal = document.getElementById('simpleModal');
       modal.style.display = 'block';
       const user = Meteor.users.findOne({_id:plate.userId});
       console.log(user);
    }

    onModificar() {
        console.log("Modifico");
        var modal = document.getElementById('simpleModal2');
        modal.style.display = 'block';
        this.pasarInfo();
    }

    onEliminar() {
        console.log("Elimino");
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'block';
    }

    closeAgregar(){
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'none';
      }



    render() {
        return (
            <div className = "EditarEmpleado">
                <div className = "containerPrincipal">
                    <div className = "Buttons">
                        <button className = "botonAgregar" onClick = {this.onAgregar.bind(this)}>Agregar Empleado</button>
                        <button className = "botonModificar" onClick = {this.onModificar.bind(this)}>Modificar Empleado</button>
                        <button className = "botonEliminar" onClick = {this.onEliminar.bind(this)}>Eliminar Empleado</button>
                    </div>


                    {/*   <div className = "Buttons">
                    <div className = "searchBarDiv">
                        <h3>Empleados</h3>
                        <input className="searchBar" placeholder="Nombre Empleado" ref="srch" type="search" />
                        <button className = "botonSearch" onClick={this.searchEmployeeSubmit.bind(this)}>Buscar</button>
                    </div>
                  </div>*/}
                  

                    
                    {/*Modal*/}
                    <div id="simpleModal" className="modal">
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
                                <form  className="agregarEmpleadoFormModal">
                                    <div >
                                        <div className = "container1">
                                            <div className = "box1">
                                                <p>
                                                    <label>Email</label>
                                                    <input ref = "email" type="email" placeholder='Enter Email' maxLength='140' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>Password</label>
                                                    <input ref="password" type="password" placeholder='Enter Password' />
                                                </p>
                                            </div>
                                            <div className="box2">
                                                <p>
                                                    <label>Confirm Password</label>
                                                    <input ref = "confirmPassword" type="password" placeholder='Confirm Password'/>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>First Name</label>
                                                    <input ref="firstName" type="text" placeholder='Enter First Name' maxLength='140' />
                                                </p>
                                            </div>
                                            <div className="box2">
                                                <p>
                                                    <label>Last Name</label>
                                                    <input ref="lastName" type="text" placeholder='Enter Last Name' maxLength='140' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className = "container1">
                                            <div className = "box1">
                                                <p>
                                                    <label>Phone Number</label>
                                                    <InputMask mask="9999-9999" ref="phoneNumber"  placeholder='Enter Phone Number' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className = "container1">
                                            <div className = "box1">
                                                <p>
                                                    <label>Address</label>
                                                    <textarea  ref="address" rows="5" placeholder='Enter Address' maxLength='140'></textarea>
                                                </p>
                                            </div>
                                        </div>
                                       
                                        <p>
                                            <button className = "confirmarAdd" >Confirmar</button>
                                        </p>
                                    </div>       
                                </form>
                            </div>
                            {/* Footer */}
                            <div className="modal-footer"></div>

                            {/*Modal*/}
                    <div id="simpleModal2" className="modal">
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header">
                                <div className="modal-header-Btn">
                                    <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
                                </div>
                                <div className="modal-header-Name">
                                    <h2>Modificar Empleado</h2>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <form  className="agregarEmpleadoFormModal">
                                    <div >
                                        <div className = "container1">
                                            <div className = "box1">
                                                <p>
                                                    <input className="searchBar" placeholder="Nombre Empleado" ref="srch" type="search" />
                                                    <button className = "botonSearch" onClick={this.searchEmployeeSubmit.bind(this)}>Buscar</button>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p>
                                            <button className = "confirmarAdd" >Confirmar</button>
                                        </p>
                                    </div>       
                                </form>
                            </div>
                            {/* Footer */}
                            <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

}
