import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardBody, CardSubtitle, Container, Row, Col, CardDeck} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../client/styles/MenuAdmin';

export default class MenuAdmin extends Component {

  openAgregar(){
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  }

  closeAgregar(){
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }

  

  render() {
    
    return (
      <div>
        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />
        <div className="pos-f-t ">
          <nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span> Menú </span>
            </button>
          </nav>

          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4 d-flex justify-content-center" id="BackgroundNavBar">
              <ul className="list-group" id="PlateList">
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(<Entree />, document.getElementById('SelectedMenu'));}} >
                  Entradas
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(renderPlatos("Soups"), document.getElementById('SelectedMenu'));}} >
                  Sopas
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(renderPlatos("Salads"), document.getElementById('SelectedMenu'));}}>
                  Ensaladas
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Wraps />, document.getElementById('SelectedMenu'));
                  }}>
                  Wraps
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<LittleItaly />, document.getElementById('SelectedMenu'));
                  }}>
                  Little Italy (Pastas & Pizettas)
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Sandwiches />, document.getElementById('SelectedMenu'));
                  }}>
                  Sándwiches
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<SideDish />, document.getElementById('SelectedMenu'));
                  }}>
                  Acompañantes
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Breakfasts />, document.getElementById('SelectedMenu'));
                  }}>
                  Desayunos
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Desserts />, document.getElementById('SelectedMenu'));
                  }}>
                  Postres
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Juices />, document.getElementById('SelectedMenu'));
                  }}>
                  Jugos
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Drinks />, document.getElementById('SelectedMenu'));
                  }}>
                  Bebidas
                </a>
              </ul>
            </div>
          </div>
        </div>

        <section id="Menu" >
          <div id="SelectedMenu"><Entree/></div>
        </section>

        <div id="wrapper">
          <button id="modalBtn" className = "btn_Agregar" onClick={this.openAgregar.bind(this)}>Agregar Plato</button>
        </div>

        {/*Modal*/}
        <div id="simpleModal" className="modal">
          <div className="modal-content">

            <div className="modal-header">
              <div className="modal-header-Btn">
                <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
              </div>
              <div className="modal-header-Name">
                <h2>Agregar Nuevo Plato</h2>
              </div>
            </div>
            <div className="modal-body">
              <form>
                <p>
                  <label>Nombre Plato</label>
                  <input ref = "nombrePlato" type="text" placeholder='Nombre Plato' maxLength='140' />
                </p>
                <p>
                  <label>Precio</label>
                  <input ref = "precioPlato" type="number" placeholder='Precio Plato' maxLength='140' />
                </p>
                
                <div className="container-1">
                  <div className="box-1">
                    <p>
                      <label>Descripción Plato</label>
                      <textarea  ref="descriptionPlato" rows="5" placeholder='Enter Descripción Plato' maxLength='140'></textarea>
                    </p>
                  </div>
                  <div className="box-2">
                    <p>
                      <label>Nutrional Facts</label>
                      <textarea  ref="nutritionalfacts" rows="5" placeholder='Enter Nutritional Facts' maxLength='140'></textarea>
                    </p>
                  </div>
                </div>
                <p>
                  <button>Agregar Plato</button>
                </p>
              </form>
            </div>
            <div className="modal-footer"></div>

          </div>
        </div>
        


        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

        <footer id="Footer">
          <img className="LogoHK" src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg" alt="Logo" />
        </footer>


      </div>
    );
  }
}

/*
Template
*/

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
  , new Plato("Entree", "Palitos de Camote", "49", "Camotes a la francesa, acompañado de aderezo Tzatziki.",
    "http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg", "")
  , new Plato("Entree", "Aros de Cebolla HK", "89", "5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.",
    "http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg", "")
  , new Plato("Entree", "Croquetas de Vegetales", "99", "Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki",
    "https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg", "")
];


class Entree extends Component {
  render() {
    return (
      <div className="card-columnas">
        {renderPlates(Entrees)}
      </div>
    );
  }
}


const renderPlates = (platesList) => {
  return platesList.map((plate, i) => {
    return (
      <div className="cards_item" key={i}>
        <div className="card-card">
          <img className="card-img" src={plate.foto} alt="Card image cap"/>
          <div className="card-content">
            <h3 className="card-titulo">{plate.titulo}</h3>
            <p className="card-price">L. {plate.precio}</p>
            <p className="card-desc">{plate.descripcion}</p>
            <ButtonPlato plato={plate}></ButtonPlato>
          </div>
        </div>
      </div>
    )
  });
}

class ButtonPlato extends Component {
  render() {
    return (
      <div class="btn-bg bg-2">
        <div class="btn btn-2">
          <button>Editar Plato</button>
        </div>
      </div>
    );
  }
}



