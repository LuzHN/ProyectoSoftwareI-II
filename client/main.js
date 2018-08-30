import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Router, browserHistory } from 'react-router';
import SweetAlert from 'sweetalert-react';

import '../imports/client/styles/menu.css';
import '../imports/client/styles/menuempleado.css';
import '../imports/client/styles/HistorialEmpleado.css';
import '../imports/client/styles/sweetalert.css';
import Menu from '../imports/ui/menu';
import MenuEmpleado from '../imports/ui/menuempleado';
import HistorialEmpleado from '../imports/ui/HistorialEmpleado';
import historialCliente from '../imports/ui/historialCliente';

import '../imports/client/styles/register';
import NotFound from '../imports/ui/NotFound';
import Principal from '../imports/ui/Principal';
import Register from '../imports/ui/Register';
import LoginPage from '../imports/ui/LoginPage';
import EditProfilePage from '../imports/ui/EditProfilePage';
import MenuAdmin from '../imports/ui/MenuAdmin';

import '../imports/client/styles/cart.css';
import Cart from '../imports/ui/Cart';
import editarEmpleadoPage from '../imports/ui/EditarEmpleadoPage';
import editarAdminsPage from '../imports/ui/EditarAdminsPage';
import editarUsuariosPage from '../imports/ui/EditarUsuariosPage';

class Hk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      show: false,
      rightVisible: false,
      orders: [],
      cart: [],
      orden: {
        estado: '',
        platos: [],
        fecha: ''
      },
      componentes: []
    };
  }

  showRight = () => {
    this.refs.right.show();
    this.setState({ rightVisible: true });
  };

  hideRight = () => {
    this.refs.right.hide();
    this.setState({ rightVisible: false });
  };

  handleClick = () => (this.state.rightVisible ? this.hideRight() : false);

  render() {
    const routes = (
      <BrowserRouter history={browserHistory}>
        <Switch history={browserHistory}>
          <Route
            path="/register"
            component={Register}
            history={browserHistory}
          />
          <Route
            path="/menuAdmin"
            component={MenuAdmin}
            history={browserHistory}
          />
          <Route path="/login" component={LoginPage} history={browserHistory} />
          <Route path="/cart" component={Cart} history={browserHistory} />
          <Route
            path="/HistorialEmpleado"
            component={HistorialEmpleado}
            history={browserHistory}
          />
          <Route
            path="/editProfile"
            component={EditProfilePage}
            history={browserHistory}
          />
          <Route
            path="/menuempleado"
            component={MenuEmpleado}
            history={browserHistory}
          />
          <Route
            path="/editEmpleado"
            component={editarEmpleadoPage}
            history={browserHistory}
          />
          <Route
            path="/editAdmins"
            component={editarAdminsPage}
            history={browserHistory}
          />
          <Route
            path="/editUsuarios"
            component={editarUsuariosPage}
            history={browserHistory}
          />
          <Route
            path="/historial"
            component={historialCliente}
            history={browserHistory}
          />
          <Route path="/" exact component={Menu} history={browserHistory} />
          <Route path="*" component={NotFound} history={browserHistory} />
        </Switch>
      </BrowserRouter>
    );
    const swal = (
      <SweetAlert
        show={this.state.show}
        title="Log Out"
        type="success"
        text="See you again soon!"
        onConfirm={() => {
          console.log('confirm'); // eslint-disable-line no-console
          this.setState({ show: false });
        }}
        onEscapeKey={() => {
          this.setState({ show: false });
        }}
        onOutsideClick={() => {
          this.setState({ show: false });
        }}
      />
    );
    const isLogIn = this.state.isLoggedIn;
    let ref;
    if (Meteor.user() !== null) {
      ref = (
        <span>
          <a
            className="nav-link"
            onClick={() => {
              // e.preventDefault();
              Meteor.logout(() => {
                // alert('Adios');
                this.setState({ show: true });
              });
            }}
            style={{ display: 'inline' }}
          >
            LogOut
          </a>
        </span>
      );
    } else {
      ref = (
        <li className="nav-item">
          <a className="nav-link" href="/login" style={{ display: 'inline' }}>
            LogIn/SingUp
          </a>
        </li>
      );
    }
    return (
      <div onClick={this.handleClick}>
        <nav className="navbar fixed-top navbar-expand-lg ">
          <a className="navbar-brand" href="/">
            <div className="img" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
              <li className="nav-item">
                <a className="nav-link" href="/" style={{ display: 'inline' }}>
                  Menu
                </a>
              </li>
              {ref}
            </ul>
          </div>
        </nav>
        {routes}
        {swal}
        <MenuSide ref="right" alignment="right">
          <MenuItem>First Page</MenuItem>
          <MenuItem>Second Page</MenuItem>
          <MenuItem>Third Page</MenuItem>
        </MenuSide>
      </div>
    );
  }
}

class MenuSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  isVisible = () => {
    return `${this.state.visible ? 'visible' : ''} ${this.props.alignment}`;
  };

  render() {
    return (
      <div className="menuSide">
        <div className={this.isVisible()}>{this.props.children}</div>
      </div>
    );
  }
}

const MenuItem = (props) => <a href="">{props.children}</a>;

Meteor.startup(() => {
  ReactDOM.render(<Hk />, document.getElementById('app'));
});
