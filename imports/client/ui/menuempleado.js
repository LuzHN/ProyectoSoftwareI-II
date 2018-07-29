import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';
import { Orders } from '../../api/orders'


window.onclick = function (event) {
    if (event.target.className == "modal") {

        var modal = document.getElementById('simpleModalEmp');
        modal.style.display = "none";
    }
}

export default class MenuEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        this.ordersTracker = Tracker.autorun(() => {
            Meteor.subscribe('orders');
            const orders = Orders.find().fetch();
            this.setState({ orders });
        });
    }

    closeAgregar() {
        var modal = document.getElementById('simpleModalEmp');
        modal.style.display = 'none';
    }

    componentWillUnmount() {
        this.ordersTracker.stop();
    }

    showModal = (Order) =>{
        var modal = document.getElementById('simpleModalEmp');
        var ModalDescription = document.getElementById('ModalDescription');


        let platillos ="";

        Order.products.map((product) => {

            platillos = platillos + product.plato + "\n";
            
        });

        ModalDescription.innerText = platillos;
        //revisar manera para insertar html correctamente con <span> o algo de listas
        modal.style.display = 'block';

    }

    cargarLista() {
        return this.state.orders.map((order) => {

            const user = Meteor.users.findOne({ _id: order.userId })
            if (order.status == "") {
                order.status = "Pending";
            }

            if (order.status == "Dispatched") {
                //no mandar nada
            } else {
                return (
                    <tr key={order._id}>
                        <td>Orden X</td>
                        <td>{order.fecha}</td>
                        <td>{user.profile.firstName + " " + user.profile.lastName}</td>
                        <td>{user.profile.phoneNumber1}</td>
                        <td>{order.status}</td>
                        <td>
                            <button onClick={(e)=>this.showModal(order)}></button>
                        </td>
                        <td>
                            <button id="btn-empleado" onClick={function () {
                                if (order.status == "Pending") {
                                    Meteor.call('orders.setInProgress', order._id)
                                }
                            }}>Cambiar a Ingresado</button>
                        </td>
                        <td>
                            <button id="btn-empleado" onClick={function () {
                                if (order.status == "InProgress" || order.status == "Dispatched") {

                                    Meteor.call('orders.setDispatched', order._id)

                                } else if (order.status == "Pending") {
                                    alert("Primero tiene que estar ingresado.")
                                }
                            }}>Cambiar a Terminado</button>
                        </td>
                    </tr>
                )
            }


        });
    }

    render() {
        return (
            <div>
                <header id="HeaderEmployee">
                    <h1 id="hk-logo-header"></h1>
                </header>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

                <div className="pos-f-t "></div>

                <section className="MenuEmployee" >
                    <h3 id="titulodeorden"></h3>
                    <table id="EmployeeTable" className="table table-hover table-blue">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nùmero Orden</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Telèfono</th>

                                <th scope="col">Estado</th>
                                <th scope="col">Ver más</th>
                                <th scope="col">Ingresar</th>
                                <th scope="col">Terminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.cargarLista()}
                        </tbody>
                    </table>
                </section>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

                <footer id="Footer">
                    <img className="LogoHK" src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg" alt="Logo" />
                    <div className="FooterDescription">
                        <h3 className="green"><b>Ubicanos</b></h3>
                        <p className="olive">Metrópolis</p>
                        <p className="olive">Torre #1</p>
                        <p className="olive">Segundo piso</p>
                        <p className="olive">Local C212, entre Nativo y Bistro</p>
                        <p className="FooterSN">
                            <a target="_blank" href="https://www.instagram.com/healthkitchenhn/"><ion-icon size="large" name="logo-instagram"></ion-icon></a>
                            <a target="_blank" href="https://fb.me/healthkitchenhn"><ion-icon name="logo-facebook"></ion-icon></a>
                            <a target="_blank" href="https://twitter.com/healthkitchenhn/"><ion-icon name="logo-twitter"></ion-icon></a>
                        </p>
                    </div>
                </footer>

                <div id="simpleModalEmp" className="modal">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-header-Btn">
                                <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
                            </div>
                            <div className="modal-header-Name">
                                <h2>Información del plato</h2>
                            </div>
                        </div>
                        {/* Body */}
                        <div id="ModalDescription">
                        </div>
                        {/* Footer */}
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        );
    }

}

