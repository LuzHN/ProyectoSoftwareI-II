import React from 'react';
import ReactDOM from 'react-dom';
import {
    Card,
    Button,
    CardImg,
    CardTitle,
    CardText,
    CardColumns,
    CardSubtitle,
    CardBody,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ListGroup,
    ListGroupItem,
    Badge,
    CardDeck,
    CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/menuempleado.css';
import { Orders } from '../api/orders';

window.onclick = function (event) {
    if (event.target.className == 'modal') {
        var modal = document.getElementById('simpleModalEmp');
        modal.style.display = 'none';
    }
};

export default class HistorialEmpleado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
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
    
    btnHistorial = () => {
        this.props.history.push({ pathname: '/menuempleado'});
    };

    showModal = (Order) => {
        //Muestra el modal con la informacion de la orden
        var modal = document.getElementById('simpleModalEmp');
        let platillos = [];

        platillos.push(
            <h1 className="black">{'Esta orden incluye lo siguiente:'}</h1>
        );

        Order.products.map((product) => {
            let comentario = '';
            if (product.descripcion == '') {
                comentario = (
                    <li className="list-group-item secondary red">
                        {'Este platillo no tiene comentario del cliente.'}
                    </li>
                );
            } else {
                comentario = (
                    <li className="list-group-item secondary red">
                        {'Comentario: ' + product.descripcion}
                    </li>
                );
            }

            platillos.push(
                <ul>
                    <li className="list-group-item blue primary">
                        {product.plato + ' (' + product.cantidad + ')'}
                    </li>
                    {comentario}
                </ul>
            );
        });

        ReactDOM.render(platillos, document.getElementById('ModalDescription'));
        modal.style.display = 'block';
    };

    countPlates(Order) {
        //Cuenta cuantos platillos en total tiene una orden

        let count = 0;

        Order.products.map((product) => {
            count += product.cantidad;
        });

        return count;
    }

    checkStatus(Order) {
        if (Order.status == 'InProgress') {
            return 'Ingresada';
        } else if (Order.status == 'Dispatched') {
            return 'Terminada';
        } else {
            return 'Pendiente';
        }
    }

    loadList() {
        //Carga la tabla con las ordenes
        return this.state.orders.map((order) => {
            const user = Meteor.users.findOne({ _id: order.userId });
            console.log(user)

            if (order.status == '') {
                order.status = 'Pending';
            }

            if (order.status == 'Dispatched') {
                return (
                    <tr key={order._id}>
                        <td>Orden X</td>
                        <td>{order.fecha}</td>
                        <td>{user.profile.firstName + ' ' + user.profile.lastName}</td>
                        <td>{user.profile.phoneNumber1}</td>
                        <td>{this.checkStatus(order)}</td>
                        <td>
                            <button id="btn-info" onClick={(e) => this.showModal(order)}>
                                <span className="spanEmployee">{'Ver Más'}</span>

                                <span className="badgeEmployee badge badge-primary badge-pill">
                                    {this.countPlates(order)}
                                </span>
                            </button>
                        </td>
                        <td>
                            <button
                                id="btn-empleado"
                                onClick={function () {
                                    if (order.status == 'Dispatched') {
                                        Meteor.call('orders.delete', order._id);
                                        toastr.success('La orden ha sido eliminada exitosamente del sistema!');
                                    }
                                }}
                            >
                               Borrar
                            </button>
                        </td>
                        
                    </tr>
                );
            } else {
                //otras ordenes
            }
        });
    }

     render() {
        return (
            <div>
                <header id="HeaderEmployee">
                    <h1 id="hk-logo-header" />
                </header>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg"/>

                <div className="pos-f-t " />

                <button
                    className="btn-employeehistory"
                    id="btn-empleado"
                    onClick={this.btnHistorial}
                >
                    Ver Historial de Ordenes
                </button>

                <section id="Sec" className="MenuEmployee">
                    <table className="EmployeeTable table table-hover table-blue table table-bordered text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nùmero Orden</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Telèfono</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Ver más</th>
                                <th scope="col">Borrar de Sistema</th>
                            </tr>
                        </thead>
                        <tbody>{this.loadList()}</tbody>
                    </table>

                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </section>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg"/>

                <footer id="Footer">
                    <img className="LogoHK" src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg" alt="Logo"/>
                    <div className="FooterDescription">
                        <h3 className="green">
                            <b>Ubicanos</b>
                        </h3>
                        <p className="olive">Metrópolis</p>
                        <p className="olive">Torre #1</p>
                        <p className="olive">Segundo piso</p>
                        <p className="olive">Local C212, entre Nativo y Bistro</p>
                        <p className="FooterSN">
                            <a target="_blank" href="https://www.instagram.com/healthkitchenhn/">
                                <ion-icon size="large" name="logo-instagram" />
                            </a>
                            <a target="_blank" href="https://fb.me/healthkitchenhn">
                                <ion-icon name="logo-facebook" />
                            </a>
                            <a target="_blank" href="https://twitter.com/healthkitchenhn/">
                                <ion-icon name="logo-twitter" />
                            </a>
                        </p>
                    </div>
                </footer>

                <div id="simpleModalEmp" className="modal">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-header-Btn">
                                <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>
                                    &times;
                                </span>
                            </div>
                            <div className="modal-header-Name">
                                <h2>Información del plato</h2>
                            </div>
                        </div>
                        {/* Body */}
                        <div id="ModalDescription" />
                        {/* Footer */}
                        <div className="modal-footer" />
                    </div>
                </div>
            </div>
        );
    }
}