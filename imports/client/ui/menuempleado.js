import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';


export default class MenuEmpleado extends React.Component {


    render() {
        return (
            <div>
                <header id="HeaderEmpleado">
                    <h1 id="hk-logo-header"></h1>
                </header>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

                <div className="pos-f-t "></div>

                <section class="MenuEmpleado" >
                    <MenuEmpleadoComponente />
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

function Plato(categoria, titulo, precio, descripcion, foto, nutricional, estado) {
    this.categoria = categoria;
    this.titulo = titulo;
    this.precio = precio;
    this.descripcion = descripcion;
    this.foto = foto;
    this.nutricional = nutricional;
    this.estado = estado;
}

var Entrees = [
    new Plato("Entree", "Cauliflower Nuggets", "129", "Empanizado con panco acompañado "
        + "con una salsa fresca de tomate y Tzatziki", "http://cdn1-www.momtastic.com/assets/uploads/2016/06/Cauliflower-Nuggets-4.jpg", "", "Pendiente")
    , new Plato("Entree", "Montaditos", "99", "Cuatro tostadas de pan de hierbas; atún, vegetales asados, pollo al pesto, y carne de berenjena",
        "https://www.philadelphia.com.mx/modx/assets/img/revision2016/images/recetas/montaditos_fuerza_roja.jpg", "", "Pendiente")
    , new Plato("Entree", "Croquetas de Vegetales", "99", "Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki",
        "https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg", "", "Pendiente")
    , new Plato("Entree", "Palitos de Camote", "49", "Camotes a la francesa, acompañado de aderezo Tzatziki.",
        "http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg", "", "Pendiente")
    , new Plato("Entree", "Aros de Cebolla HK", "89", "5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.",
        "http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg", "", "Pendiente")

];


class MenuEmpleadoComponente extends React.Component {

    state = {
        simon: "simon",
        entradas: [{"categoria":"Entree","titulo":"Cauliflower Nuggets","precio":"129","descripcion":"Empanizado con panco acompañado con una salsa fresca de tomate y Tzatziki","foto":"http://cdn1-www.momtastic.com/assets/uploads/2016/06/Cauliflower-Nuggets-4.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Montaditos","precio":"99","descripcion":"Cuatro tostadas de pan de hierbas; atún, vegetales asados, pollo al pesto, y carne de berenjena","foto":"https://www.philadelphia.com.mx/modx/assets/img/revision2016/images/recetas/montaditos_fuerza_roja.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Croquetas de Vegetales","precio":"99","descripcion":"Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki","foto":"https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Palitos de Camote","precio":"49","descripcion":"Camotes a la francesa, acompañado de aderezo Tzatziki.","foto":"http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Aros de Cebolla HK","precio":"89","descripcion":"5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.","foto":"http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Palitos de Camote","precio":"49","descripcion":"Camotes a la francesa, acompañado de aderezo Tzatziki.","foto":"http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Aros de Cebolla HK","precio":"89","descripcion":"5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.","foto":"http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg","nutricional":""},
        {"categoria":"Entree","titulo":"Croquetas de Vegetales","precio":"99","descripcion":"Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki","foto":"https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg","nutricional":""}]
    }

    render() {
        return (
            <div class="card-columns EmployeeCardColumn">
                {renderPlates(Entrees, this.state.simon, this.imprimir)}
            </div>
        );
    }

    imprimir = (i, estado) =>{
        let entradass = this.entradas;
        entradass[i].estado = estado;
        this.setState({...state, entradas: entradass})
    }
}

const renderPlates = (platesList, simon, imprimir) => { //metodo a usar con la base
    return platesList.map((plate, i) => {
        return (


            <div class="card EmployeeCard " key={i}>
                <div class="card-body">
                    <div>

                        <h1 class="card-title">{plate.titulo}</h1>
                        <hr></hr>
                        <h2 id="InfoCliente" class="card-text">Cliente: Juancho Pelancho</h2>
                        <h2 id="InfoCliente" class="card-text">Teléfono: 94795544</h2>
                        <h2 id="InfoCliente" class="card-text">Dirección: Colonia quince de octubre, casa 103444, bloque xxxx, calle 23443</h2>
                        <p id="ComentarioCliente" class="card-text">
                            Lorem ipsum dolor sitorem ipsum dolor sitorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  {}
                        </p>
                        <hr></hr>


                    </div>

                    <div class="card-footer text-muted">
                        <span id = "state">Estado: {plate.estado}</span>
                        <button id = "btn" onClick={function () {
                            if (plate.estado == "Pendiente") {
                                console.log(platesList[i].estado);
                                platesList[i].estado = "simon";
                                console.log(platesList[i].estado);
                                simon = "nomon";
                                imprimir(i, "Terminado");
                            } else {
                                
                            }
                        }}>Cambiar a {returnState(plate.estado)}</button>
                    </div>


                </div>
            </div>


        );
    });
}

function returnState(state){
    if(state == "Pendiente"){
        return "Terminado";
    } else{
        return state;
    }
}

class CardFooter extends React.Component {
    render() {

        if (this.props.plate.estado == "Pendiente") {

            return (

                <div>
                    <span>Estado: {this.props.plate.estado}</span>
                    <button onClick={function () {
                        this.props.plate.estado = "Terminado"
                    }}>Cambiar a Terminado</button>
                </div>
            );
        } else {
            return (

                <div>
                    <span>Estado: {this.props.plate.estado}</span>
                    <button onClick={function () {
                        this.props.plate.estado = "Pendiente"
                    }}>Cambiar a Pendiente</button>
                </div>

            );
        }
    }
}




/*

<div class="card-footer text-muted">
                <span>Estado: {this.props.plate.estado}</span>
                <button onClick={function () {
                    if (this.props.plate.estado == "Pendiente") {
                        this.props.plate.estado = "Terminado"
                    } else {
                        this.props.plate.estado = "Pendiente"
                    }
                }}>Cambiar a {returnState(this.props.plate.estado)}</button>
            </div>

*/
