import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/menuempleado.css';
import { Orders } from '../api/orders';

window.onclick = function (event) { //cerrar modal si la persona clickea afuera
  if (event.target.className == 'modal') {
    var modal = document.getElementById('simpleModalEmp');
    modal.style.display = 'none';
  }
};

export default class MenuEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Pagina: "Menu"
    };
  }

  closeAgregar() { //cerrar modal que muestra info del platillo
    var modal = document.getElementById('simpleModalEmp');
    modal.style.display = 'none';
  }

  btnHistorial = () => { //mostrar otra tabla
    if (this.state.Pagina == "Menu") {
      this.setState({ Pagina: "Historial" });
      $('#btn-empleado').text("Ver Ordenes Pendientes");
      $('#headerEmpleado').text("Historial de Ordenes Terminadas");
    } else if (this.state.Pagina == "Historial") {
      $('#btn-empleado').text("Ver Historial de Ordenes Terminadas");
      $('#headerEmpleado').text("Historial de Ordenes Pendientes e Ingresadas");
      this.setState({ Pagina: "Menu" });
    }
  };

  render() { //render principal
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

        <h1 id="headerEmpleado" className="headerEmpleado">
          Historial de Ordenes Pendientes e Ingresadas
        </h1>

        <section id="Sec" className="MenuEmployee">

          <Tabla Pagina={this.state.Pagina} />
        </section>
        <button
          className="btn-employeehistory blueMarine"
          id="btn-empleado"
          onClick={this.btnHistorial}
        >
          Ver Historial de Ordenes Terminadas
        </button>

        <img
          id="ColorStrip"
          src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg"
        />

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
            <p className="olive">Metrópolis</p>
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


class Tabla extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() { //cargar arreglo de orders desde meteor subscriptions
    this.ordersTracker = Tracker.autorun(() => {
      Meteor.subscribe('orders');
      const orders = Orders.find().fetch();
      this.setState({ orders });
    });
  }

  componentWillUnmount() {
    this.ordersTracker.stop();
  }

  showModal = (Order) => {
    //Muestra el modal con la informacion de la orden
    var modal = document.getElementById('simpleModalEmp');
    let platillos = [];

    platillos.push(
      <h1 className="black">{'Esta orden incluye lo siguiente:'}</h1>
    );

    Order.products.map((product) => {
      let comentario = '';
      if (product.descripcion == '' || typeof product.descripcion === undefined) {
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

  checkStatus(Order) { //revisa el estado de cada orden y regresa un span con el estado
    let jsx = ""
    if (Order.status == 'InProgress') {

      return "INGRESADA";
    } else if (Order.status == 'Dispatched') {
      return 'Terminada';
    } else {
      jsx =
        <span>
          {"PENDIENTE "}
          <i className="fas fa-exclamation-triangle fa-2x red"></i>
        </span>

      return jsx;
    }
  }

  render() { //render de clase Tabla

    return (
      <div>
        {this.loadTable()}
      </div>
    );
  }

  loadHistory() {
    //Carga la tabla con las ordenes del historial
    return this.state.orders.map((order) => {
      const user = Meteor.users.findOne({ _id: order.userId });
      if (order.status == 'Dispatched') {
        return (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.fechaEntrada}</td>
            <td>{order.fechaDespacho}</td>
            <td>{user.profile.firstName + ' ' + user.profile.lastName}</td>
            <td>{user.profile.phoneNumber1}</td>
            <td>{order.direccion}</td>
            <td>{this.checkStatus(order)}</td>
            <td>
              <button
                id="btn-empleado"
                onClick={function () {
                  if (window.confirm('Esta segur@ de esconder esta orden del sistema?')) {
                    //Meteor.call('orders.delete', order._id);
                    Meteor.call('orders.setHidden', order._id);
                    toastr.success('La orden ha sido escondida exitosamente del sistema!');
                  }
                }}
              >
                Esconder
                        </button>
            </td>
          </tr>
        );
      } else {
        //otras ordenes
      }
    });
  }

  loadMenu() { //carga las ordenes pendientes/terminadas
    return this.state.orders.map((order) => {
      const user = Meteor.users.findOne({ _id: order.userId });
      if (order.status == '') {
        order.status = 'Pending';
      }
      if (order.status == 'Dispatched' || order.status == 'Hidden') {
        //no agrega nada
      }
      else {
        return (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.fechaEntrada}</td>
            <td>{user.profile.firstName + ' ' + user.profile.lastName}</td>
            <td>{user.profile.phoneNumber1}</td>
            <td>{order.direccion}</td>
            <td>
              {this.checkStatus(order)}
            </td>
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
                  if (order.status == 'Pending') {
                    Meteor.call('orders.setInProgress', order._id);
                    toastr.success('La orden ha sido cambiada a Ingresada');
                  } else if (order.status == 'InProgress') {
                    toastr.warning('La orden ya esta en estado Ingresada');
                  }
                }}
              >
                Cambiar a Ingresado
              </button>
            </td>
            <td>
              <button
                id="btn-empleado"
                onClick={function () {
                  if (order.status == 'InProgress' &&
                    window.confirm('¿Esta seguro de cambiar esta orden a terminada?')) {
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

                    Meteor.call('orders.cambiarFechaDespacho', order._id, stringFecha);
                    Meteor.call('orders.setDispatched', order._id);
                    toastr.success('La orden ha sido terminada y despachada!');
                  } else if (order.status == 'Pending') {
                    toastr.warning('Primero tiene que estar ingresado.');
                  }
                }}
              >
                Cambiar a Terminado
              </button>
            </td>
          </tr>
        );
      }
    });
  }

  loadTable() { //carga la tabla dependiendo del tipo (pendientes/ingresadas o terminadas)
    switch (this.props.Pagina) {
      case "Menu": {
        return (
          <table className="EmployeeTable table table-hover table-blue table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID Orden</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Telèfono</th>
                <th scope="col">Dirección</th>
                <th scope="col">Estado</th>
                <th scope="col">Ver más</th>
                <th scope="col">Ingresar</th>
                <th scope="col">Terminar</th>
              </tr>
            </thead>
            <tbody>{this.loadMenu()}</tbody>
          </table>
        );
        break;
      }
      case "Historial": {
        return (
          <table className="EmployeeTable table table-hover table-blue table table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID Orden</th>
              <th scope="col">Fecha de Entrada </th>
              <th scope="col">Fecha de Despacho </th>
              <th scope="col">Cliente</th>
              <th scope="col">Tel�fono</th>
              <th scope="col">Dirección</th>
              <th scope="col">Estado</th>
              <th scope="col">Esconder</th>
            </tr>
          </thead>
          <tbody>{this.loadHistory()}</tbody>
        </table>
        );
        break;
      }
      default: {
        break;
      }
    }
  }
} // fin componente tabla
