import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';
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
import { Dishes } from '../api/dishes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../client/styles/MenuAdmin.css';

let dishID;

window.onclick = function (event) {
  if (event.target.className == 'modal') {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }
};

export default class MenuAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      platosMostrados: [],
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
  }

  renderPlatos = (nombrePlato) => {
    const platosMostrar = [];
    for (var i = 0; i < this.state.dishes.length; i++) {
      if (this.state.dishes[i].type === nombrePlato) {
        platosMostrar.push(this.state.dishes[i]);
      }
    }
    this.setState({...this.state,platosMostrados: platosMostrar });
  };

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
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

  setNutritionalFactsToZero(){ //Limpia el Nutritional Facts Percentages
    document.getElementById('TotalFatPercentage').innerHTML = 0;
    document.getElementById('CholesterolPercentage').innerHTML = 0;
    document.getElementById('SodiumPercentage').innerHTML = 0;
    document.getElementById('ProteinPercentage').innerHTML = 0;
    document.getElementById('CarbsPercentage').innerHTML = 0;
    document.getElementById('DietaryFiberPercentage').innerHTML = 0;
    document.getElementById('SugarPercentage').innerHTML = 0;
    document.getElementById('VitaminAPercentage').innerHTML = 0;
    document.getElementById('VitaminAPercentage').innerHTML = 0;
    document.getElementById('VitaminCPercentage').innerHTML = 0;
    document.getElementById('IronPercentage').innerHTML = 0;
    document.getElementById('CalciumPercentage').innerHTML = 0;
    document.getElementById('TotalSatFatPercentage').innerHTML = 0;
  }

  openAgregar() {

    this.setNutritionalFactsToZero();
    document.getElementById('myForm').reset();
    this.refs.nombrePlato.value = '';
    this.refs.precioPlato.value = '';
    this.refs.descriptionPlato.value = '';
    let title = document.getElementById('h2_ModalTitle');
    title.innerHTML = 'Agregar Plato';
    let botonEditar = document.getElementById('bt_ModalEditar');
    botonEditar.style.display = 'none';
    let botonAgregar = document.getElementById('bt_ModalAgregar');
    botonAgregar.style.display = 'block';
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  }

  closeAgregar() {
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }

  closeDeleteModal() {
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'none';
  }

  deletePlateFinal() {
    Meteor.call('dishes.delete', dishID);

    dishID = '';
    this.closeDeleteModal();
  }

  agregarFinal() {
    let name = this.refs.nombrePlato.value.trim();
    let price = this.refs.precioPlato.value.trim();
    price = parseFloat(price).toFixed(2);
    let image = this.refs.imagenPlato.value.trim();
    let description = this.refs.descriptionPlato.value.trim();
    let type = this.refs.tipodeComida[this.refs.tipodeComida.selectedIndex].value;

    let calories = this.refs.calorias.value.trim() || "0";
    let totalFat = this.refs.totalFat.value.trim() || "0";
    let saturatedFat = this.refs.saturatedFat.value.trim() || "0";
    let transFat = this.refs.transFat.value.trim() || "0";
    let cholesterol = this.refs.cholesterol.value.trim() || "0";
    let sodium = this.refs.sodium.value.trim() || "0";
    let totalCarbohydrates = this.refs.totalCarbohydrates.value.trim() || "0";
    let dietaryFibers = this.refs.dietaryFibers.value.trim() || "0";
    let sugar = this.refs.sugar.value.trim() || "0";
    let protein = this.refs.protein.value.trim() || "0";
    let vitaminA = this.refs.vitaminA.value.trim() || "0";
    let vitaminC = this.refs.vitaminC.value.trim() || "0";
    let calcium = this.refs.calcium.value.trim() || "0";
    let iron = this.refs.iron.value.trim() || "0";


    if (name != '' && price > 0 && description != '' && price > 0) {
      let dish = {
        name,
        price,
        description,
        type,
        image,
        calories,
        totalFat,
        saturatedFat,
        transFat,
        cholesterol,
        sodium,
        totalCarbohydrates,
        dietaryFibers,
        sugar,
        protein,
        vitaminA,
        vitaminC,
        calcium,
        iron
      };
      Meteor.call('dishes.insert', dish);

      document.getElementById('myForm').reset(); //resets los inputs del form
      toastr.success('Se ha agregado un plato nuevo.');
    } else {
      if (price <= 0) {
        toastr.warning('Precio no válido.');
      } else {
        toastr.warning('No ha ingresado todos los datos.');
      }
    }
  }

  editarFinal() {
    let nameNew = this.refs.nombrePlato.value.trim();
    let priceNew = this.refs.precioPlato.value.trim();
    priceNew = parseFloat(priceNew).toFixed(2);
    let imageNew = this.refs.imagenPlato.value.trim();
    let descriptionNew = this.refs.descriptionPlato.value.trim();
    let typeNew = this.refs.tipodeComida[this.refs.tipodeComida.selectedIndex].value;

    let caloriesNew = this.refs.calorias.value.trim() || "0";
    let totalFatNew = this.refs.totalFat.value.trim() || "0";
    let saturatedFatNew = this.refs.saturatedFat.value.trim() || "0";
    let transFatNew = this.refs.transFat.value.trim() || "0";
    let cholesterolNew = this.refs.cholesterol.value.trim() || "0";
    let sodiumNew = this.refs.sodium.value.trim() || "0";
    let totalCarbohydratesNew = this.refs.totalCarbohydrates.value.trim() || "0";
    let dietaryFibersNew = this.refs.dietaryFibers.value.trim() || "0";
    let sugarNew = this.refs.sugar.value.trim() || "0";
    let proteinNew = this.refs.protein.value.trim() || "0";
    let vitaminANew = this.refs.vitaminA.value.trim() || "0";
    let vitaminCNew = this.refs.vitaminC.value.trim() || "0";
    let calciumNew = this.refs.calcium.value.trim() || "0";
    let ironNew = this.refs.iron.value.trim() || "0";

    let id = dishID;


    if (nameNew != '' && priceNew != '' && descriptionNew != '' && priceNew > 0) {

      let dish = {
        id,
        nameNew,
        priceNew,
        descriptionNew,
        typeNew,
        imageNew,
        caloriesNew,
        totalFatNew,
        saturatedFatNew,
        transFatNew,
        cholesterolNew,
        sodiumNew,
        totalCarbohydratesNew,
        dietaryFibersNew,
        sugarNew,
        proteinNew,
        vitaminANew,
        vitaminCNew,
        calciumNew,
        ironNew
      };
      Meteor.call('dishes.update', dish);

      toastr.success('Se ha editado el plato.');
      document.getElementById('myForm').reset(); //resets los inputs del form

    } else {
      toastr.warning('No ha ingresado todos los datos.');
    }
  }

  render() {
    return (
      <div>

        <header id="Header">
          <h1 id="hk-logo-header" />
        </header>

        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />
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

        <section id="Menu" >
          <div id="SelectedMenu"><Entree dishes={this.state.platosMostrados} /></div>
        </section>

        <div id="wrapper">
          <button id="modalBtn" className="btn_Agregar" onClick={this.openAgregar.bind(this)}>Agregar Plato</button>
        </div>

        {/*Modal*/}
        <div id="simpleModal" className="modal">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-Btn">
                <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
              </div>
              <div className="modal-header-Name">
                <h2 id="h2_ModalTitle">Agregar Plato</h2>
              </div>
            </div>
            {/* Body */}
            <div className="modal-body">
              <form id="myForm" className="contactModal" onSubmit={this.onSubmit.bind(this)}>
                <div className="flexModal">
                  <div className="body1">
                    <p>
                      <label id="labelAgregar">Nombre Plato</label>
                      <input className="inputAgregar" id="inputPlato" ref="nombrePlato" type="text" placeholder='Nombre Plato' maxLength='140' />
                    </p>
                    <p>
                      <label id="labelAgregar">Precio</label>
                      <input className="inputAgregar" id="inputPrecio" ref="precioPlato" type="number" step="any" placeholder='Precio Plato' maxLength="5" />
                    </p>
                    <p>
                      <label id="labelAgregar">URL De Imagen</label>
                      <input className="inputAgregar" id="inputURL" ref="imagenPlato" type="text" placeholder='https://www.google.com/' />
                    </p>
                    <p>
                      <label id="labelAgregar">Descripción Plato</label>
                      <textarea className="inputAgregar" id="inputDescripcion" ref="descriptionPlato" rows="5" placeholder='Enter Descripción Plato' maxLength='140'></textarea>
                    </p>
                    <p>
                      <label id="labelAgregar">Tipo de Plato</label>
                      <select name="tipoComida" id="tipoDeComida" ref="tipodeComida">
                        <option value="Entree">Entree</option>
                        <option value="Soup">Soup</option>
                        <option value="Salad">Salad</option>
                        <option value="Wrap">Wrap</option>
                        <option value="LittleItaly">LittleItaly</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="SideDish">SideDish</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Juice">Juice</option>
                        <option value="Drink">Drink</option>
                      </select>
                    </p>
                  </div>
                  <div className="body2">
                    {/*Nutritional Facts*/}
                    <div className="nutritionLabel" id="nutrilabel" >
                      <div className="yes">
                        <div className="title">
                          Nutritional Facts
                    </div>

                        <div className="serving">
                          <div className="cf">
                            <div className="servingSizeText fl">
                              Serving Size
                        </div>

                            <div className="servingUnitQuantity fl">
                              1
                        </div>
                          </div>
                        </div>

                        <div className="bar1"></div>

                        <div className="line m" style={{ fontWeight: "bold" }}>
                          Amount Per Serving
                    </div>

                        <div className="line">
                          <div className="fr">
                            Calories from Fat 0
                          </div>

                          <div>
                            <b>Calories</b>
                            <input id="inputCalorias" ref="calorias" type="number" step="any" placeholder='0' maxLength='3' />
                          </div>
                        </div>

                        <div className="bar2"></div>

                        <div className="line ar" style={{ fontWeight: "bold" }}>
                          % Daily Value<sup>*</sup>
                        </div>

                        <div className="line">
                          <div className="dv">
                            <b id="TotalFatPercentage">0</b>%
                      </div><b>Total Fat</b>  <input id="inputTotalFat" ref="totalFat" type="number" step="any" placeholder='0g' maxLength='3' />
                        </div>

                        <div className="line indent">
                          <div className="dv">
                            <b id="TotalSatFatPercentage">0</b>%
                      </div>Saturated Fat  <input id="inputSaturatedFat" ref="saturatedFat" type="number" step="any" placeholder='0g' maxLength='3' />
                        </div>

                        <div className="line indent">
                          <i>Trans</i> Fat  <input id="inputTransFat" ref="transFat" type="number" step="any" placeholder='0g' maxLength='3' />
                        </div>


                        <div className="line">
                          <div className="dv">
                            <b id="CholesterolPercentage">0</b>%
                      </div>
                          <b>Cholesterol</b>
                          <input id="inputCholesterol" ref="cholesterol" type="number" step="any" placeholder='0mg' maxLength='3' />
                        </div>

                        <div className="line">
                          <div className="dv">
                            <b id="SodiumPercentage" >0</b>%
                      </div>
                          <b>Sodium</b>
                          <input id="inputSodium" ref="sodium" type="number" step="any" placeholder='0mg' maxLength='3' />
                        </div>

                        <div className="line">
                          <div className="dv">
                            <b id="CarbsPercentage" >0</b>%
                      </div>
                          <b>Total Carbohydrates</b>
                          <input id="inputTotalCarbs" ref="totalCarbohydrates" type="number" step="any" placeholder='0g' maxLength='140' />
                        </div>

                        <div className="line indent">
                          <div className="dv">
                            <b id="DietaryFiberPercentage">0</b>%
                          </div>
                          Dietary Fiber
                      <input id="inputDietaryFiber" ref="dietaryFibers" type="number" step="any" placeholder='0g' maxLength='3' />
                        </div>

                        <div className="line indent">
                          <div className="dv">
                            <b id="SugarPercentage">0</b>%
                          </div>
                          Sugars  <input id="inputSugars" ref="sugar" type="number" step="any" placeholder='0g' maxLength='3' />
                        </div>

                        <div className="line">
                          <div className="dv">
                            <b id="ProteinPercentage">0</b>%
                          </div>
                          <b>Protein</b>
                          <input id="inputProtein" ref="protein" step="any" type="number" placeholder='0g' maxLength='3' />
                        </div>

                        <div className="bar1"></div>

                        <div className="line vitaminA">
                          <div className="dv">
                            <b id="VitaminAPercentage">0</b>%
                      </div>
                          Vitamin A
                      <input id="inputVitaminA" ref="vitaminA" type="number" step="any" placeholder='0%' maxLength='3' />
                        </div>

                        <div className="line vitaminC">
                          <div className="dv">
                            <b id="VitaminCPercentage">0</b>%
                      </div>
                          Vitamin C
                      <input id="inputVitaminC" ref="vitaminC" type="number" step="any" placeholder='0%' maxLength='3' />
                        </div>

                        <div className="line calcium">
                          <div className="dv">
                            <b id="CalciumPercentage">0</b>%
                      </div>
                          Calcium
                      <input id="inputCalcium" ref="calcium" type="number" step="any" placeholder='0%' maxLength='3' />
                        </div>

                        <div className="line iron">
                          <div className="dv">
                            <b id="IronPercentage">0</b>%
                      </div>
                          Iron
                      <input id="inputIron" ref="iron" type="number" step="any" placeholder='0%' maxLength='3' />
                        </div>

                        <div className="dvCalorieDiet line">
                          <div className="calorieNote">
                            <span className="star">*</span> Percent Daily Values are based on a 2000 calorie diet.<br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p id="bt_ModalAgregar">
                  <button className="finalBtn" onClick={this.agregarFinal.bind(this)}>Agregar Plato</button>
                </p>
                <p id="bt_ModalEditar">
                  <button className="finalBtn" onClick={this.editarFinal.bind(this)}>Editar Plato</button>
                </p>
              </form>
            </div>
            {/* Footer */}
            <div className="modal-footer"></div>
          </div>
        </div>




        {/* <!-- Modal --> */}
        <div className="modal" id="exampleModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirmar</h5>
                <button className="close">
                  <span onClick={this.closeDeleteModal.bind(this)}>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Desea Borrar Platillo?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.closeDeleteModal.bind(this)}>Cancelar</button>
                <button className="btn btn-danger" onClick={this.deletePlateFinal.bind(this)}>Borrar</button>
              </div>
            </div>
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

class Entree extends Component {
  render() {
    return (
      <div className="card-columnas">
        {renderPlates(this.props.dishes)}
      </div>
    );
  }
}


const renderPlates = (platesList) => {
  return platesList.map((dish) => {
    return (
      <div className="cards_item" key={dish._id}>
        <div className="card-card">
          <img className="card-img" alt="Card image cap" src={dish.image} />
          <div className="card-content">
            <h3 className="card-titulo">{dish.name}</h3>
            <p className="card-price">L. {dish.price}</p>
            <p className="card-desc">{dish.description}</p>
            <ButtonPlato plato={dish}></ButtonPlato>
          </div>
        </div>
      </div>
    )
  });
}


class ButtonPlato extends Component {


  loadNutritionalFacts() { //carga los nutritional facts del platillo

    $('#TotalFatPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.totalFat) / 65.0) * 100).toFixed(1));
    $('#TotalSatFatPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.saturatedFat) / 20.0) * 100).toFixed(1));
    $('#CholesterolPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.cholesterol) / 300.0) * 100).toFixed(1));
    $('#SodiumPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.sodium) / 2400.0) * 100).toFixed(1));
    $('#ProteinPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.protein) / 50.0) * 100).toFixed(1));
    $('#CarbsPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.totalCarbohydrates) / 300.0) * 100).toFixed(1));
    $('#DietaryFiberPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.dietaryFibers) / 25.0) * 100).toFixed(1));
    $('#SugarPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.sugar) / 50.0) * 100).toFixed(1));
    $('#VitaminAPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.vitaminA) / 1000.0) * 100).toFixed(1));
    $('#VitaminCPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.vitaminC) / 60.0) * 100).toFixed(1));
    $('#IronPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.iron) / 14.0) * 100).toFixed(1));
    $('#CalciumPercentage').text(parseFloat((parseInt(this.props.plato.nutritionFacts.calcium) / 1100.0) * 100).toFixed(1));
  }

  
  loadModal() { //llena el modal de editar platillo con la información debida


    this.loadNutritionalFacts();

    let field = document.getElementById("inputPlato");
    field.value = this.props.plato.name;

    field = document.getElementById("inputPrecio");
    field.value = this.props.plato.price;

    field = document.getElementById("inputDescripcion");
    field.value = this.props.plato.description;

    field = document.getElementById("inputURL");
    field.value = this.props.plato.image;

    field = document.getElementById("tipoDeComida");
    field.value = this.props.plato.type;

    field = document.getElementById("inputCalorias");
    field.value = this.props.plato.nutritionFacts.calories;

    field = document.getElementById("inputTotalFat");
    field.value = this.props.plato.nutritionFacts.totalFat;

    field = document.getElementById("inputSaturatedFat");
    field.value = this.props.plato.nutritionFacts.saturatedFat;

    field = document.getElementById("inputTransFat");
    field.value = this.props.plato.nutritionFacts.transFat;

    field = document.getElementById("inputCholesterol");
    field.value = this.props.plato.nutritionFacts.cholesterol;

    field = document.getElementById("inputSodium");
    field.value = this.props.plato.nutritionFacts.sodium;

    field = document.getElementById("inputTotalCarbs");
    field.value = this.props.plato.nutritionFacts.totalCarbohydrates;

    field = document.getElementById("inputDietaryFiber");
    field.value = this.props.plato.nutritionFacts.dietaryFibers;

    field = document.getElementById("inputSugars");
    field.value = this.props.plato.nutritionFacts.sugar;

    field = document.getElementById("inputProtein");
    field.value = this.props.plato.nutritionFacts.protein;

    field = document.getElementById("inputVitaminA");
    field.value = this.props.plato.nutritionFacts.vitaminA;

    field = document.getElementById("inputVitaminC");
    field.value = this.props.plato.nutritionFacts.vitaminC;

    field = document.getElementById("inputCalcium");
    field.value = this.props.plato.nutritionFacts.calcium;

    field = document.getElementById("inputIron");
    field.value = this.props.plato.nutritionFacts.iron;
  }

  editDish() {

    dishID = this.props.plato._id;
    document.getElementById('myForm').reset(); //resets los inputs del form
    let modal = document.getElementById('simpleModal');
    let title = document.getElementById("h2_ModalTitle");
    title.innerHTML = "Editar Plato"

    let botonAgregar = document.getElementById("bt_ModalAgregar");
    botonAgregar.style.display = "none";
    let botonEditar = document.getElementById("bt_ModalEditar");

    const dish = Dishes.findOne({ _id: this.props.plato._id });

    this.loadModal(); //carga el modal con toda la info del plato

    botonEditar.style.display = "block";
    modal.style.display = 'block';
  }


  deleteDish() {

    dishID = this.props.plato._id;
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'block';
    // Meteor.call('dishes.delete', this.props.plato._id);
  }

  render() {
    return (
      <div className="btn-bg bg-2">
        <div className="btn btn-2">
          <button onClick={() => this.editDish()}>Edit</button>
        </div>
        <div className="btn btn-2">
          <button onClick={() => this.deleteDish()}>Delete</button>
        </div>
      </div>

    );
  }
}