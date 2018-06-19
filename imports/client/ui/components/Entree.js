import React, {Component} from "react";
// var fs = require("fs");
// import fs from 'fs';

import ButtonPlato from './ButtonPlato';

function Plato (categoria, titulo, precio, descripcion, foto, nutricional)  {
  this.categoria = categoria;
  this.titulo = titulo;
  this.precio = precio;
  this.descripcion = descripcion;
  this.foto = foto;
  this.nutricional = nutricional;
}
Entrees = [
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

renderPlates = (platesList, props) => {
  console.log(JSON.stringify(platesList));

  const plat = props.Platos;
  console.log("Props: ", props)
  return plat.map((plate, i) => {
    return (
      <div className="cards_item" key={i}>
        <div className="card-card">
          <img className="card-img" src={plate.foto} alt="Card image cap"/>
          <div className="card-content">
            <h3 className="card-titulo">{plate.titulo}</h3>
            <p className="card-price">L. {plate.precio}</p>
            <p className="card-desc">{plate.descripcion}</p>
            <ButtonPlato plato={plate} ></ButtonPlato>
          </div>
        </div>
      </div>
    )
  });
}

class Entree extends Component {

  state = {

  }

  // console.log(this.props);


  render() {
    return (
      <div className="card-columnas">
          {renderPlates(Entrees, this.props)}
      </div>
    );
  }
}

export default Entree;
