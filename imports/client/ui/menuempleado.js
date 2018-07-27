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

    componentWillUnmount() {
        this.ordersTracker.stop();
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
                    <MenuEmployeeComponent orders={this.state.orders} />
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

            </div>
        );
    }

}
class MenuEmployeeComponent extends React.Component {
    render() {
        return (

            <table id="EmployeeTable" className="table">
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
                    {renderTable(this.props.orders)}
                </tbody>
            </table>
        );
    }
}

const renderTable = (platesList) => {

    console.log(platesList);


    return platesList.map((plate) => {

        const user = Meteor.users.findOne({ _id: plate.userId })
        if (plate.status == "") {
            plate.status = "Pending";
        }

        if (plate.status == "Dispatched") {
            //no mandar nada
        } else {
            return (
                <tr key={plate._id}>
                    <td>Orden X</td>
                    <td>{plate.fecha}</td>
                    <td>{user.profile.firstName + " " + user.profile.lastName}</td>
                    <td>{user.profile.phoneNumber1}</td>
                    <td>{plate.status}</td>
                    <td>
                        <button></button>
                    </td>
                    <td>
                        <button id="btn-empleado" onClick={function () {
                            if (plate.status == "Pending") {
                                Meteor.call('orders.setInProgress', plate._id)
                            }
                        }}>Cambiar a Ingresado</button>
                    </td>
                    <td>
                        <button id="btn-empleado" onClick={function () {
                            if (plate.status == "InProgress" || plate.status == "Dispatched") {
                                console.log("hola")
                                Meteor.call('orders.setDispatched', plate._id)

                            } else if (plate.status == "Pending") {
                                alert("Primero tiene que estar ingresado.")
                            }
                        }}>Cambiar a Terminado</button>
                    </td>
                </tr>
            )
        }


    });
}
