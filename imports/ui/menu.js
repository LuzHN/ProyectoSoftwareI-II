import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/menu.css';

//Components
import ModalNutritional from './modal';
import Entree from './Entree';
import ButtonPlato from './ButtonPlato';

//Schemas
import { Dishes } from '../api/dishes';

export default class Menu extends Component {
  defaultMenu = 'Entree';

  state = {
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

  componentDidMount() {
    this.dishesTracker = Tracker.autorun(() => {
      Meteor.subscribe('dishes');
      const dishes = Dishes.find().fetch();
      console.log(dishes);
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

  clickComida = (plato, precio, imagen) => {
    const platoOrdenado = {
      plato,
      precio,
      imagen
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
    return (
      <div>
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
              onClick={this.btnCart}
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
              // Platos={
              //   [{"type":"Entree","name":"Cauliflower Nuggets","price":"129","description":"Empanizado con panco acompañado con una salsa fresca de tomate y Tzatziki","image":"http://cdn1-www.momtastic.com/assets/uploads/2016/06/Cauliflower-Nuggets-4.jpg","nutricional":""},
              //   {"type":"Entree","name":"Montaditos","price":"99","description":"Cuatro tostadas de pan de hierbas; atún, vegetales asados, pollo al pesto, y carne de berenjena","image":"https://www.philadelphia.com.mx/modx/assets/img/revision2016/images/recetas/montaditos_fuerza_roja.jpg","nutricional":""},
              //   {"type":"Entree","name":"Croquetas de Vegetales","price":"99","description":"Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki","image":"https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg","nutricional":""},
              //   {"type":"Entree","name":"Palitos de Camote","price":"49","description":"Camotes a la francesa, acompañado de aderezo Tzatziki.","image":"http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg","nutricional":""},
              //   {"type":"Entree","name":"Aros de Cebolla HK","price":"89","description":"5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.","image":"http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg","nutricional":""},
              //   {"type":"Entree","name":"Palitos de Camote","price":"49","description":"Camotes a la francesa, acompañado de aderezo Tzatziki.","image":"http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg","nutricional":""},
              //   {"type":"Entree","name":"Aros de Cebolla HK","price":"89","description":"5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.","image":"http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg","nutricional":""},
              //   {"type":"Entree","name":"Croquetas de Vegetales","price":"99","description":"Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki","image":"https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg","nutricional":""}]
              // }
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
                <h2>Agregar Plato</h2>
              </div>
            </div>
            {/* Body */}
            <div
              className="nutritionLabel"
              id="nutrilabel"
              style={{ widh: '50%' }}
            >
              <div className="yes">
                <div className="title">Nutrition Facts</div>

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
                    <b>Calories</b> 0
                  </div>
                </div>

                <div className="bar2" />

                <div className="line ar" style={{ fontWeight: 'bold' }}>
                  % Daily Value<sup>*</sup>
                </div>

                <div className="line">
                  <div className="dv">
                    <b>0</b>%
                  </div>
                  <b>Total Fat</b> 0g
                </div>

                <div className="line indent">
                  <div className="dv">
                    <b>0</b>%
                  </div>Saturated Fat 0g
                </div>

                <div className="line indent">
                  <i>Trans</i> Fat 0g
                </div>

                <div className="line">
                  <div className="dv">
                    <b>0</b>%
                  </div>
                  <b>Cholesterol</b> 0mg
                </div>

                <div className="line">
                  <div className="dv">
                    <b>0</b>%
                  </div>
                  <b>Sodium</b> 0mg
                </div>

                <div className="line">
                  <div className="dv">
                    <b>0</b>%
                  </div>
                  <b>Total Carbohydrates</b> 0g
                </div>

                <div className="line indent">
                  <div className="dv">
                    <b>0</b>%
                  </div>Dietary Fiber 0g
                </div>

                <div className="line indent">Sugars 0g</div>

                <div className="line">
                  <b>Protein</b> 0g
                </div>

                <div className="bar1" />

                <div className="line vitaminA">
                  <div className="dv">0%</div>Vitamin A
                </div>

                <div className="line vitaminC">
                  <div className="dv">0%</div>Vitamin C
                </div>

                <div className="line calcium">
                  <div className="dv">0%</div>Calcium
                </div>

                <div className="line iron">
                  <div className="dv">0%</div>Iron
                </div>

                <div className="dvCalorieDiet line">
                  <div className="calorieNote">
                    <span className="star">*</span> Percent Daily Values are
                    based on a 2000 calorie diet.<br />
                    <div className="ingredientListDiv">
                      <b className="active" id="ingredientList">
                        INGREDIENTS:
                      </b>{' '}
                      None
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="modal-footer" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
