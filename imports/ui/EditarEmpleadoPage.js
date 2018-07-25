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

    handleSubmit(e) {
        e.preventDefault();
    }

    onAgregar() {
       console.log("Agrego");
    }

    onModificar() {
        console.log("Modifico");
    }

    onEliminar() {
        console.log("Elimino")
    }

    onSubmit() {

    }

    render() {
        return (
            <div className = "EditarEmpleado">
                <form className = "employeeDataForm" onSubmit = {this.handleSubmit.bind(this)}>

                    <div className = "Buttons">
                        <button className = "botonAgregar" onClick = {this.onAgregar.bind(this)}>Agregar Empleado</button>
                        <button className = "botonModificar" onClick = {this.onModificar.bind(this)}>Modificar Empleado</button>
                        <button className = "botonEliminar" onClick = {this.onEliminar.bind(this)}>Eliminar Empleado</button>
                    </div>
                    <div className="contact">
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
                    </div>
                    




                    <table align = "center">

                        <tr>
                            <td colspan = "7" class = "header">EMPLEADOS</td>
                        </tr>

                        <tr>
                            <th>Identificador</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>

                        <tr>
                            <td>Nombre</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Apellido</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Correo</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Telefono 1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Telefono 2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Telefono 3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Telefono 4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Direccion 1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Direccion 2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Direccion 3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Direccion 4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>



                    </table>
              
                </form>
            </div>
        );
    }

}
