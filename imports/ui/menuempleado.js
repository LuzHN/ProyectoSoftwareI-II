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
      orders: [],
    };
  }

  componentDidMount() {
    this.ordersTracker = Tracker.autorun(() => {
      Meteor.subscribe('orders');
      const orders = Orders.find().fetch();
      this.setState({ orders });
    });
  }

  closeAgregar() { //cerrar modal
    var modal = document.getElementById('simpleModalEmp');
    modal.style.display = 'none';
  }

  btnHistorial = () => { //irse a pagina de historial
    this.props.history.push({ pathname: '/HistorialEmpleado' });
    
  };

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
      if (product.descripcion == '') {
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
    if (Order.status == 'InProgress') {
      return 'Ingresada';
    } else if (Order.status == 'Dispatched') {
      return 'Terminada';
    } else {
      return 'Pendiente';
    }
  }

  loadList() {
    //Carga la tabla con las ordenes
    return this.state.orders.map((order) => {
      const user = Meteor.users.findOne({ _id: order.userId });
      if (order.status == '') {
        order.status = 'Pending';
      }

      if (order.status == 'Dispatched') {
        //no agrega nada
      } else {
        return (
          <tr key={order._id}>
            <td>Orden X</td>
            <td>{order.fechaEntrada}</td>
            <td>{user.profile.firstName + ' ' + user.profile.lastName}</td>
            <td>{user.profile.phoneNumber1}</td>
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
                id="btn-empleado"
                onClick={function () {
                  if (order.status == 'Pending') {
                    Meteor.call('orders.setInProgress', order._id);
                    toastr.success('La orden ha sido cambiada a Ingresada');
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
                    window.confirm('¿Esta seguro de cambiar esta orden a terminada?') ) {
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

        <button
          className="btn-employeehistory"
          id="btn-empleado"
          onClick={this.btnHistorial}
        >
          Ver Historial de Ordenes
        </button>

        <section id="Sec" className="MenuEmployee">
          <table className="EmployeeTable table table-hover table-blue table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nùmero Orden</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Telèfono</th>
                <th scope="col">Estado</th>
                <th scope="col">Ver más</th>
                <th scope="col">Ingresar</th>
                <th scope="col">Terminar</th>
              </tr>
            </thead>
            <tbody>{this.loadList()}</tbody>
          </table>
        </section>

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