import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import SweetAlert from 'sweetalert-react';
import ReactDOM from 'react-dom';

import { Orders } from '../api/orders';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/sweetalert.css';

window.onclick = function(event) {
  //cerrar modal si la persona clickea afuera
  if (event.target.className == 'modal') {
    var modal = document.getElementById('simpleModalEmp');
    modal.style.display = 'none';
  }
};

export default class historialCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.ordersTracker = Tracker.autorun(() => {
      Meteor.subscribe('orders.getClientOrders');
      const ordenes = Orders.find({ userId: Meteor.userId() }).fetch();
      console.log(ordenes);
      this.setState({ ...this.state, orders: ordenes });
    });
  }

  componentWillUnmount() {
    this.ordersTracker.stop();
  }

  closeAgregar() {
    //cerrar modal
    var modal = document.getElementById('simpleModalEmp');
    modal.style.display = 'none';
  }

  showModal = (Order) => {
    //Muestra el modal con la informacion de la orden
    var modal = document.getElementById('simpleModalEmp');
    let platillos = [];
    console.log(modal);

    platillos.push(
      <h1 className="black">{'Esta orden incluye lo siguiente:'}</h1>
    );

    Order.products.map((product) => {
      let comentario = '';
      if (
        product.descripcion == '' ||
        typeof product.descripcion === 'undefined'
      ) {
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
    let jsx = '';
    if (Order.status == 'InProgress') {
      return 'INGRESADA';
    } else if (Order.status == 'Dispatched') {
      return 'Terminada';
    } else if (Order.status == 'Canceled' || Order.status == 'Hidden') {
      return 'CANCELADA';
    } else {
      jsx = <span>{'PENDIENTE '}</span>;

      return jsx;
    }
  }

  checkCanceledDate(Order) {
    if (typeof Order.fechaCancelado == 'undefined') {
      return 'N/A';
    } else {
      return Order.fechaCancelado;
    }
  }

  loadList = () => {
    return this.state.orders.map((order) => {
      if (order.status == '') {
        order.status = 'Pending';
      }
      if (order.status == 'Canceled') {
        order.status = 'Canceled';
      }
      return (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.fechaEntrada}</td>
          <td>{this.checkCanceledDate(order)}</td>
          <td>{order.direccion}</td>
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
              id="btn-cambiarestado"
              className="cancelar"
              disabled={order.status !== 'Pending' ? true : false}
              onClick={function() {
                Meteor.call('orders.setCanceled', order._id);

                let d = new Date();
                let stringFecha =
                  d.getDate() +
                  '/' +
                  (d.getMonth() + 1) +
                  '/' +
                  d.getFullYear() +
                  ', ' +
                  d.getHours() +
                  ':' +
                  d.getMinutes() +
                  ':' +
                  d.getSeconds();

                Meteor.call(
                  'orders.cambiarFechaCancelacion',
                  order._id,
                  stringFecha
                );

                toastr.success('La orden ha sido cancelada');
              }}
            >
              Cancelar Orden
            </button>
          </td>
          <td>
            <button
              id="btn-cambiarestado"
              onClick={() => {
                console.log('Volver a pedir');
                this.props.history.push({
                  pathname: '/',
                  state: order.products
                });
              }}
            >
              Volver a Pedir
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <header id="HeaderEmployee">
          <h1 id="hk-logo-header" />
        </header>

        <img
          id="ColorStrip"
          src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg"
        />

        <div className="pos-f-t " />

        <h1 className="headerEmpleado">Historial de Ordenes</h1>

        <section id="Sec" className="MenuEmployee">
          <table className="EmployeeTable table table-hover table-blue table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Número Orden</th>
                <th scope="col">Fecha de Orden </th>
                <th scope="col">Fecha de Cancelacion </th>
                <th scope="col">Dirección </th>
                <th scope="col">Estado</th>
                <th scope="col">Ver platos</th>
                <th scope="col">Cancelar</th>
                <th scope="col">Volver a pedir</th>
              </tr>
            </thead>
            <tbody>{this.loadList()}</tbody>
          </table>
        </section>

        <footer id="Footer">
          <img
            className="LogoHK"
            src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg"
            alt="Logo"
          />
          <div className="FooterDescription">
            <h3 className="green">
              <b>Ubicanos</b>
            </h3>
            <p className="olive">Metr�polis</p>
            <p className="olive">Torre #1</p>
            <p className="olive">Segundo piso</p>
            <p className="olive">Local C212, entre Nativo y Bistro</p>
            <p className="FooterSN">
              <a
                target="_blank"
                href="https://www.instagram.com/healthkitchenhn/"
              >
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
                <span
                  className="closeBtn"
                  onClick={this.closeAgregar.bind(this)}
                >
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
