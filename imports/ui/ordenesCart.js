import React, { Component } from 'react';
import { Input } from 'reactstrap';

class OrdenPlato extends Component {
  //
  // constructor(props){
  //   super(props);
  state = {
    descripcion: '',
    imagen: this.props.imagen,
    titulo: this.props.titulo,
    precio: this.props.precio,
    cantidad: this.props.cantidad
  };
  // }

  handleDescriptionChange = (evt) => {
    const state = { ...this.state, descripcion: evt.target.value };
    this.setState(state);
  };

  render() {
    return (
      <tr>
        <th scope="row">
          <div className="card">
            <img
              className="card-img-top"
              src={this.state.imagen}
              alt="Image food"
            />
            <div className="card-body">
              <h5 className="card-title">{this.state.nuevoTitulo}</h5>
              <p>Comentarios:</p>
              <Input
                type="textarea"
                name="description"
                placeholder="Ej: Quiero mi carne termino medio con poca sal"
                value={this.state.descripcion}
                maxLength="280"
                onChange={this.handleDescriptionChange}
              />
            </div>
          </div>
        </th>
        <td>
          Lps.
          {parseInt(this.state.precio).toFixed(2)}
        </td>
        <td>{this.state.cantidad}</td>
      </tr>
    );
  }
}

export default OrdenPlato;
