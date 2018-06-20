import React, {Component} from "react";

import ButtonPlato from './ButtonPlato';

renderPlates = (props) => {
  const plat = props.Platos;

  return plat.map((plate, i) => {
    return (
      <div className="cards_item" key={i}>
        <div className="card-card">
          <img className="card-img" src={plate.image} alt="Card image cap"/>
          <div className="card-content">
            <h3 className="card-titulo">{plate.name}</h3>
            <p className="card-price">L. {plate.price}</p>
            <p className="card-desc">{plate.description}</p>
            <ButtonPlato texto="Informacion Nutricional" onClick={props.modal}></ButtonPlato>
            <ButtonPlato texto="Agregar a Carrito" onClick={props.onClick} plato={plate.name} precio={plate.price} imagen={plate.image}></ButtonPlato>
          </div>
        </div>
      </div>
    )
  });
}

class Entree extends Component {

  state = {

  }

  render() {
    return (
      <div className="card-columnas">
          {renderPlates(this.props)}
      </div>
    );
  }
}

export default Entree;
