import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';


export default class MenuEmployee extends React.Component {

    render() {
        return (
            <div>
                <header id="HeaderEmployee">
                    <h1 id="hk-logo-header"></h1>
                </header>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

                <div className="pos-f-t "></div>

                <section class="MenuEmployee" >
                    <MenuEmployeeComponent />
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

    state = {

        orders: [
            { "titulo": "Cauliflower Nuggets", "estado": "Pendiente", "cliente": "Jose Ricardo", "Direccion": "Nullam sed nisi eu leo suscipit consectetur nec in sapien." },
            { "titulo": "Montaditos", "estado": "Pendiente", "cliente": "Harold Mendoza", "Direccion": "Mauris sit amet purus vel eros accumsan faucibus. Aenean leo." },
            { "titulo": "Croquetas de Vegetales", "estado": "Pendiente", "cliente": "Luis Cabrera", "Direccion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque enim." },
            { "titulo": "Palitos de Camote", "estado": "Pendiente", "cliente": "Diego Galdamez", "Direccion": "Pellentesque maximus molestie hendrerit." },
            { "titulo": "Aros de Cebolla HK", "estado": "Pendiente", "cliente": "Walther Carrasco", "Direccion": "Pellentesque maximus molestie hendrerit." },
            { "titulo": "Palitos de Camote", "estado": "Pendiente", "cliente": "Mauricio Matamoros", "Direccion": "Pellentesque maximus molestie hendrerit." },
            { "titulo": "Aros de Cebolla HK", "estado": "Pendiente", "cliente": "Miguel Ardon", "Direccion": "Pellentesque maximus molestie hendrerit." },
            { "titulo": "Croquetas de Vegetales", "estado": "Pendiente", "cliente": "Mario Raudales", "Direccion": "Pellentesque maximus molestie hendrerit." }]
    }

    render() {
        return (
            <div class="card-columns EmployeeCardColumn">
                {renderPlates(this.state.orders, this.cambiarEstado, this.deleteCard)}
            </div>
        );
    }

    cambiarEstado = (i, estado) => {
        var neworders = this.state.orders;
        neworders[i].estado = estado;
        this.setState({ ...this.state, orders: neworders })
    }

    deleteCard = (i) => {
        var neworders = this.state.orders;
        neworders.splice(i, 1);
        this.setState({ ...this.state, orders: neworders })

    }
}

const renderPlates = (platesList, cambiarEstado, deleteCard) => { //metodo a usar con la base
    return platesList.map((plate, i) => {
        return (
            <div className="card EmployeeCard " key={i}>
                <div className="card-body">
                    <div>
                        <h1 className="card-title">{plate.titulo}
                            <button onClick={function () {
                                deleteCard(i);
                            }} className="RemovePlate">x</button>
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

                    <div class="card-footer text-muted">
                        <span className = "green">Estado: </span>
                        <span className = "red">{plate.estado}</span>
                        <button className="ChangeState" onClick= {function () {
                            if (plate.estado == "Pendiente") {
                                cambiarEstado(i, "Ingresado");
                                
                            }
                        }}>Cambiar a Ingresado</button>
                        <button className="ChangeState" onClick={function () {
                            if (plate.estado == "Ingresado") {
                                cambiarEstado(i, "Terminado");
                            } else if (plate.estado == "Pendiente") {
                                alert("Primero tiene que estar ingresado.")
                            }
                        }}>Cambiar a Terminado</button>
                    </div>
                </div>
            </div>
        );
    });
}

