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
                    <MenuEmpleadoComponente/>
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

function Plato(categoria, titulo, precio, descripcion, foto, nutricional) {
    this.categoria = categoria;
    this.titulo = titulo;
    this.precio = precio;
    this.descripcion = descripcion;
    this.foto = foto;
    this.nutricional = nutricional;
  }

var Entrees = [
    new Plato("Entree", "Cauliflower Nuggets", "129", "Empanizado con panco acompañado "
      + "con una salsa fresca de tomate y Tzatziki", "http://cdn1-www.momtastic.com/assets/uploads/2016/06/Cauliflower-Nuggets-4.jpg", "")
    , new Plato("Entree", "Montaditos", "99", "Cuatro tostadas de pan de hierbas; atún, vegetales asados, pollo al pesto, y carne de berenjena",
      "https://www.philadelphia.com.mx/modx/assets/img/revision2016/images/recetas/montaditos_fuerza_roja.jpg", "")
    , new Plato("Entree", "Croquetas de Vegetales", "99", "Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki",
      "https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg", "")
    , new Plato("Entree", "Palitos de Camote", "49", "Camotes a la francesa, acompañado de aderezo Tzatziki.",
      "http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg", "")
    , new Plato("Entree", "Aros de Cebolla HK", "89", "5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.",
      "http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg", "")
  ];


  class MenuEmpleadoComponente extends React.Component{
      render(){
          return(
            <div class="card-columns EmployeeCardColumn">
            {renderPlates(Entrees)}
            </div>
          );
      }
  }

  const renderPlates = (platesList) => { //metodo a usar con la base
    return platesList.map((plate) => {
      return (
  
  
        <div class="card EmployeeCard ">
                <div class="card-body">
                    <div>

                        <h1 class="card-title">{plate.titulo}</h1>
                        <hr></hr>
                        <h2 id="InfoCliente" class="card-text">Cliente: Juancho Pelancho</h2>
                        <h2 id="InfoCliente" class="card-text">Teléfono: 94795544</h2>
                        <h2 id="InfoCliente" class="card-text">Dirección: Colonia quince de octubre, casa 103444, bloque xxxx, calle 23443</h2>
                        <p id="ComentarioCliente" class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  {}
                        </p>
                        <hr></hr>


                    </div>

                    <div>
                        <button>Pendiente</button>
                    </div>
                    <div class="card-footer text-muted">
                        Estado: {}
                    </div>

                </div>
            </div>
        
  
      );
    });
  }
