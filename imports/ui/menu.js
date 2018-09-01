import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactDOM from 'react-dom';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  Container,
  Row,
  Col,
  CardDeck
} from 'reactstrap';
import SweetAlert from 'sweetalert-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/menu.css';
import '../client/styles/sweetalert.css';

//Components
import ModalNutritional from './modal';
import Entree from './Entree';
import ButtonPlato from './ButtonPlato';

//Schemas
import { Dishes } from '../api/dishes';
import { Orders } from '../api/orders';

export default class Menu extends Component {
  defaultMenu = 'Entree';

  state = {
    swal: {
      show: false,
      index: 0
    },
    swaldir: {
      show: false,
      index: 0
    },
    selectedFood: this.defaultMenu,
    dishes: [],
    cart: {
      estado: 'Preorden',
      platos: []
    },
    platosMostrados: [],
    cantidadOrden: 0,
    cantEntree: 0,
    cantSoup: 0,
    cantEnsalada: 0,
    cantWrap: 0,
    cantPasta: 0,
    cantSandwich: 0,
    cantAcompañante: 0,
    cantDesayuno: 0,
    cantPostre: 0,
    cantJugo: 0,
    cantBebida: 0
  };

  showRight = () => {
    this.refs.right.show();
    this.setState({ rightVisible: true });
  };

  hideRight = () => {
    this.refs.right.hide();
    this.setState({ rightVisible: false });
  };

  handleClick = () => (this.state.rightVisible ? this.hideRight() : false);

  componentDidMount() {
    // Meteor.call('check.Role');
    this.dishesTracker = Tracker.autorun(() => {
      Meteor.subscribe('dishes');
      const dishes = Dishes.find().fetch();
      let cantEntree = 0,
        cantSoup = 0,
        cantEnsalada = 0,
        cantWrap = 0,
        cantPasta = 0,
        cantSandwich = 0,
        cantAcompañante = 0,
        cantDesayuno = 0,
        cantPostre = 0,
        cantJugo = 0,
        cantBebida = 0;
      for (var i = 0; i < dishes.length; i++) {
        if (dishes[i].type === 'Entree') {
          cantEntree++;
        } else if (dishes[i].type === 'Soup') {
          cantSoup++;
        } else if (dishes[i].type === 'Salad') {
          cantEnsalada++;
        } else if (dishes[i].type === 'Wrap') {
          cantWrap++;
        } else if (dishes[i].type === 'LittleItaly') {
          cantPasta++;
        } else if (dishes[i].type === 'Sandwich') {
          cantSandwich++;
        } else if (dishes[i].type === 'SideDish') {
          cantAcompañante++;
        } else if (dishes[i].type === 'Breakfast') {
          cantDesayuno++;
        } else if (dishes[i].type === 'Dessert') {
          cantPostre++;
        } else if (dishes[i].type === 'Juice') {
          cantJugo++;
        } else if (dishes[i].type === 'Drink') {
          cantBebida++;
        }
      }
      this.setState({
        ...this.state,
        dishes,
        platosMostrados: dishes,
        cantEntree,
        cantSoup,
        cantEnsalada,
        cantWrap,
        cantPasta,
        cantSandwich,
        cantAcompañante,
        cantDesayuno,
        cantPostre,
        cantJugo,
        cantBebida
      });
    });

    if (this.props.history.location.state) {
      let cant = 0;
      this.props.history.location.state.map((orden) => {
        cant += orden.cantidad;
      });
      this.setState({
        ...this.state,
        cantidadOrden: cant,
        cart: {
          estado: 'Preorden',
          platos: [...this.props.history.location.state]
        }
      });
    }
  }

  componentWillUnmount() {
    this.dishesTracker.stop();
  }

  renderPlatos = (nombrePlato) => {
    const platosMostrar = [];
    for (var i = 0; i < this.state.dishes.length; i++) {
      if (this.state.dishes[i].type === nombrePlato) {
        platosMostrar.push(this.state.dishes[i]);
      }
    }
    this.setState({ ...this.state, platosMostrados: platosMostrar });
  };

  clickComida = (plato, precio, imagen, description = '') => {
    const platoOrdenado = {
      plato,
      precio,
      imagen,
      description
    };

    const platosOrdenados = this.state.cart.platos;
    if (platosOrdenados.length > 0) {
      let encontro = false;
      for (var i = 0; i < platosOrdenados.length; i++) {
        if (platosOrdenados[i].plato === platoOrdenado.plato) {
          platosOrdenados[i].cantidad++;
          encontro = true;
        }
      }

      if (encontro === false) {
        platosOrdenados.push({ ...platoOrdenado, cantidad: 1 });
      }
    } else {
      platosOrdenados.push({ ...platoOrdenado, cantidad: 1 });
    }
    const cantidadOrden = ++this.state.cantidadOrden;
    this.setState({ ...this.state, platos: platosOrdenados, cantidadOrden });
  };

  btnCart = () => {
    this.props.history.push({ pathname: '/cart', state: this.state.cart });
  };

  openModal = () => {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  };

  closeModal() {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }

  render() {
    const swal = (
      <div>
        <SweetAlert
          show={this.state.swal.show}
          title="Comentario"
          text="Agregue un comentario para su platillo"
          type="input"
          // inputType="password"
          inputPlaceholder="Ej. Quiero mi carne con mucha sal"
          onConfirm={(inputValue) => {
            let platos = [...this.state.platos];
            console.log({ inputValue });
            platos[this.state.swal.index].descripcion = inputValue;
            this.setState({
              swal: { show: false, index: 0 },
              platos: platos,
              cart: {
                estado: 'Preorden',
                platos
              }
            });
          }}
        />
      </div>
    );
    const menuItems = this.state.cart.platos.map((item, i) => (
      <div key={i} className="platoOrdenado">
        <img src={item.imagen} alt="Imagen del platillo" />
        <a
          imagen={item.imagen}
          titulo={item.plato}
          precio={parseInt(item.precio).toFixed(2)}
          cantidad={item.cantidad}
        >
          {item.plato}
        </a>
        <a className="menuItemCant">Cant: {item.cantidad}</a>

        <a
          className="button-comentario"
          href="#"
          role="button"
          onClick={() => this.setState({ swal: { show: true, index: i } })}
        >
          <span />
          <div className="icon">
            <i className="far fa-comment-dots" />
          </div>
        </a>
      </div>
    ));

    return (
      <div onClick={this.handleClick}>
        <header id="Header">
          <h1 id="hk-logo-header" />
        </header>
        <img
          id="ColorStrip"
          src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg"
        />

        <div className="pos-f-t ">
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler btn-menu"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
              <span> Menú</span>
            </button>
            <button
              className="navbar-toggler carrito-btn"
              // onClick={this.btnCart}
              onClick={this.showRight}
            >
              Cart{' '}
              <span className="carrito-cant">{this.state.cantidadOrden}</span>
            </button>
          </nav>

          <div className="collapse" id="navbarToggleExternalContent">
            <div
              className="bg-dark p-4 d-flex justify-content-center"
              id="BackgroundNavBar"
            >
              <ul className="list-group" id="PlateList">
                <a
                  href="#SelectedMenu"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Entree')}
                >
                  Entradas
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantEntree}
                  </span>
                </a>
                <a
                  href="#SelectedMenu"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Soup')}
                >
                  Sopas
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantSoup}
                  </span>
                </a>
                <a
                  href="#SelectedMenu"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Salad')}
                >
                  Ensaladas
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantEnsalada}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Wrap')}
                >
                  Wraps
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantWrap}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('LittleItaly')}
                >
                  Little Italy (Pastas & Pizettas)
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantPasta}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Sandwich')}
                >
                  Sándwiches
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantSandwich}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('SideDish')}
                >
                  Acompañantes
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantAcompañante}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Breakfast')}
                >
                  Desayunos
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantDesayuno}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Dessert')}
                >
                  Postres
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantPostre}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Juice')}
                >
                  Jugos
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantJugo}
                  </span>
                </a>
                <a
                  href="#"
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={(e) => this.renderPlatos('Drink')}
                >
                  Bebidas
                  <span className="badge badge-primary badge-pill">
                    {this.state.cantBebida}
                  </span>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <section id="Menu">
          <div id="SelectedMenu">
            <Entree
              hola="simon"
              Platos={this.state.platosMostrados}
              onClick={this.clickComida}
              modal={this.openModal}
            />
          </div>
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

        {/*Modal*/}
        <div id="simpleModal" className="modal">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-Btn">
                <span className="closeBtn" onClick={this.closeModal}>
                  &times;
                </span>
              </div>
              <div className="modal-header-Name">
                <h2>Nutritional Facts</h2>
              </div>
            </div>
            {/* Body */}

            <div className="nutritionLabel" id="nutrilabel">
              <div className="yes">
                <div className="title">Nutritional Facts</div>

                <div className="serving">
                  <div className="cf">
                    <div className="servingSizeText fl">Serving Size</div>
                    <div className="servingUnitQuantity fl">1</div>
                  </div>
                </div>

                <div className="bar1" />

                <div className="line m" style={{ fontWeight: 'bold' }}>
                  Amount Per Serving
                </div>

                <div className="line">
                  <div className="fr">Calories from Fat 0</div>

                  <div>
                    <b>Calories</b>
                    &nbsp;
                    <span id="TotalCalories" />
                  </div>
                </div>

                <div className="bar2" />

                <div className="line ar" style={{ fontWeight: 'bold' }}>
                  % Daily Value
                  <sup>*</sup>
                </div>

                <div className="line">
                  <div className="dv">
                    <b id="TotalFatPercentage">0</b>%
                  </div>
                  <b>Total Fat</b>
                  &nbsp;
                  <span id="TotalFat" />g
                </div>

                <div className="line indent">
                  <div className="dv">
                    <b id="TotalSatFatPercentage">0</b>%
                  </div>
                  Saturated Fat &nbsp;
                  <span id="TotalSatFat" />g
                </div>

                <div className="line indent">
                  <i>Trans</i> Fat &nbsp;
                  <span id="TotalTrans" />
                </div>

                <div className="line">
                  <div className="dv">
                    <b id="CholesterolPercentage">0</b>%
                  </div>
                  <b>Cholesterol</b>
                  &nbsp;
                  <span id="TotalCholesterol" />
                  mg
                </div>

                <div className="line">
                  <div className="dv">
                    <b id="SodiumPercentage">0</b>%
                  </div>
                  <b>Sodium</b>
                  &nbsp;
                  <span id="TotalSodium" />
                  mg
                </div>

                <div className="line">
                  <div className="dv">
                    <b id="CarbsPercentage">0</b>%
                  </div>
                  <b>Total Carbohydrates</b>
                  &nbsp;
                  <span id="TotalCarbs" />g
                </div>

                <div className="line indent">
                  <div className="dv">
                    <b id="DietaryFiberPercentage">0</b>%
                  </div>
                  Dietary Fiber &nbsp;
                  <span id="TotalDietaryFiber" />g
                </div>

                <div className="line indent">
                  <div className="dv">
                    <b id="SugarPercentage">0</b>%
                  </div>
                  Sugars
                  <span id="TotalSugar" />g
                </div>

                <div className="line">
                  <div className="dv">
                    <b id="ProteinPercentage">0</b>%
                  </div>
                  <b>Protein</b>
                  &nbsp;
                  <span id="TotalProtein" />g
                </div>

                <div className="bar1" />
                <div className="line vitaminA">
                  <div className="dv">
                    <b id="VitaminAPercentage">0</b>%
                  </div>
                  Vitamin A &nbsp;
                  <span id="TotalVitaminA" />%
                </div>
                <div className="line vitaminC">
                  <div className="dv">
                    <b id="VitaminCPercentage">0</b>%
                  </div>
                  Vitamin C &nbsp;
                  <span id="TotalVitaminC" />%
                </div>
                <div className="line calcium">
                  <div className="dv">
                    <b id="CalciumPercentage">0</b>%
                  </div>
                  Calcium &nbsp;
                  <span id="TotalCalcium" />%
                </div>
                <div className="line iron">
                  <div className="dv">
                    <b id="IronPercentage">0</b>%
                  </div>
                  Iron &nbsp;
                  <span id="TotalIron" />%
                </div>
                <div className="dvCalorieDiet line">
                  <div className="calorieNote">
                    <span className="star">*</span> Percent Daily Values are
                    based on a 2000 calorie diet.
                    <br />
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="modal-footer" />
            </div>
          </div>
        </div>
        <MenuSide
          ref="right"
          alignment="right"
          platos={this.state.cart}
          history={this.props.history}
          resetCount={() => {
            this.setState({ ...this.state, cantidadOrden: 0 });
          }}
        >
          {menuItems}
        </MenuSide>
        {swal}
      </div>
    );
  }
}

class MenuSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swal: {},
      visible: false,
      user: {}
    };
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

  calcularPrecio() {
    let price = 0;
    let getPrice = this.props.platos.platos.forEach((item) => {
      price += item.precio * item.cantidad;
    });
    return price;
  }

  componentDidMount() {
    Meteor.subscribe('orders.getClientOrders');
  }

  historial = () => {
    const orders = Orders.find({ userId: Meteor.userId() }).fetch();
    // this.setState({ orders });
    console.log(orders);
    console.log(this.context.history);
    this.props.history.push({ pathname: '/historial', state: orders });
  };

  confirmar = (evt) => {
    let orden = this.props.platos;
    orden.platos = [...this.props.platos.platos];
    orden.products = [];
    let userprofile = Meteor.user() ? Meteor.user().profile : '';
    var cbo = document.getElementById('dirCliente');
    const dirSeleccionada = cbo.selectedIndex;
    switch (dirSeleccionada) {
      case 0: {
        orden.direccion = userprofile.address1;
        break;
      }
      case 1: {
        orden.direccion = userprofile.address2;
        break;
      }
      case 2: {
        orden.direccion = userprofile.address3;
        break;
      }
      case 3: {
        orden.direccion = userprofile.address4;
        break;
      }
      default: {
      }
    }
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
    orden.fechaEntrada = stringFecha;
    orden.fechaDespacho = '';

    for (let index = 0; index < this.props.platos.platos; index++) {
      orden.products.push({
        cantidad: this.props.platos.platos[i].cantidad,
        descripcion: this.props.platos.platos[i].descripcion,
        imagen: this.props.platos.platos[i].imagen,
        plato: this.props.platos.platos[i].titulo,
        precio: this.props.platos.platos[i].precio
      });
    }

    orden.products = orden.platos;

    orden.cliente = Meteor.user().profile.firstName;
    console.log(orden);
    Meteor.call('orders.insert', orden);
    orden = {
      estado: '',
      platos: [],
      products: []
    };
    const cart = {
      estado: 'Preorden',
      platos: [],
      products: []
    };
    this.props.platos.platos = [];
    this.props.resetCount();
    this.setState({ ...this.state, platos: [], orden, cart });
  };

  onSubmit(e) {
    this.confirmar.bind(this);
  }

  loadBox() {
    //carga el combobox con las direcciones

    let userprofile = Meteor.user() ? Meteor.user().profile : '';

    let dir1 = userprofile.address1;
    let dir2 = userprofile.address2;
    let dir3 = userprofile.address3;
    let dir4 = userprofile.address4;

    var selectTag = '<select id = "dirCliente"><option>' + dir1 + '</option>';

    if (dir2 !== '') {
      selectTag += '<option>' + dir2 + '</option>';
    }

    if (dir3 !== '') {
      selectTag += '<option>' + dir3 + '</option>';
    }

    if (dir4 !== '') {
      selectTag += '<option>' + dir4 + '</option>';
    }
    selectTag += '</select>';
    return (
      <form
        id="myForm"
        className="contactModal"
        onSubmit={this.onSubmit.bind(this)}
      >
        <span>Seleccione su metodo de pago y direcciones: </span>
        <label id="labelAgregar">Direcciones Disponibles</label>
        <div dangerouslySetInnerHTML={{ __html: selectTag }} />
      </form>
    );
  }

  render() {
    //sweetalert de direcciones/pago
    let swal = (
      <div>
        <SweetAlert
          show={this.state.swal.show}
          title="Metodo de Pago & Direcciones"
          showCancelButton
          html
          text={renderToStaticMarkup(this.loadBox())}
          onConfirm={() => {
            this.confirmar();
            this.setState({
              swal: { show: false, index: 0 }
            });
            toastr.success('La orden ha sido pedida');
          }}
          onCancel={() => {
            this.setState({
              swal: { show: false, index: 0 }
            });
          }}
          onOutsideClick={() => {
            this.setState({
              swal: { show: false }
            });
          }}
        />
      </div>
    );
    return (
      <div className="menuSide">
        <div className={this.isVisible()}>
          {this.props.children}
          <span className="menuSideTotal">
            Sub Total: L. {this.calcularPrecio()}
          </span>
          <span className="menuSideTotal">
            ISV: L. {(this.calcularPrecio() * 0.15).toFixed(2)} (15%)
          </span>
          <span className="menuSideTotal">
            Sub Total: L. {this.calcularPrecio() * 0.15 + this.calcularPrecio()}
          </span>
          <ButtonPlato
            texto="Comprar"
            onClick={(e) => {
              this.setState({
                swal: { show: true, index: 0 }
              });
            }}
          />
          {swal}

          <ButtonPlato texto="Historial" onClick={this.historial} />
        </div>
      </div>
    );
  }
}

const MenuItem = (props) => <span>{props.children}</span>;
