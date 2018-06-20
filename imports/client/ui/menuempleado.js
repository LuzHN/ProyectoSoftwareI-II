import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';
import {Orders} from '../../api/orders'


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
                    <MenuEmployeeComponent orders={this.state.orders}/>
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
            <div className="card-columns EmployeeCardColumn">
                {renderPlates(this.props.orders, this.cambiarEstado, this.deleteCard)}
            </div>
        );
    }
}

const renderPlates = (platesList) => { //metodo a usar con la base
    return platesList.map((plate) => {
        return (plate.products.map((product, i) => {
            return (
                <div className="card EmployeeCard " key={i}>
                    <div className="card-body">
                        <div>
                            <h1 className="card-title">{`${product.plato} - Cantidad: ${product.cantidad}`}

                            </h1>
                            <hr></hr>
                            <h2 id="InfoCliente" className="card-text">Cliente: {plate.cliente}</h2>
                            <h2 id="InfoCliente" className="card-text">Teléfono: 94795544</h2>
                            <h2 id="InfoCliente" className="card-text">Dirección: {plate.Direccion}</h2>
                            <p id="ComentarioCliente" className="card-text">
                                Lorem ipsum dolor sitorem ipsum dolor sitorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  {}
                            </p>
                            <hr></hr>
                        </div>

                        <div className="card-footer text-muted">
                            <span className = "green">Estado: </span>
                            <span className = "red">{plate.status}</span>
                            <button className="ChangeState" id="ingresado" onClick= {function () {
                                if (plate.status == "") {
                                    Meteor.call('orders.setInProgress', plate._id)
                                    this.document.getElementById("ingresado").setAttribute("disabled", "true");
                                }
                            }}>Cambiar a Ingresado</button>
                            <button className="ChangeState" onClick={function () {
                                if (plate.status == "InProgress") {
                                    Meteor.call('orders.setDispatched', plate._id)
                                } else if (plate.status == "") {
                                    alert("Primero tiene que estar ingresado.")
                                }
                            }}>Cambiar a Terminado</button>
                        </div>
                    </div>
                </div>
            );
        }));

    });
}
