import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardBody, CardSubtitle, Container, Row, Col, CardDeck} from 'reactstrap';
import { Dishes } from '../api/dishes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../client/styles/MenuAdmin';

export default class MenuAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: []
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let name = this.refs.nombrePlato.value.trim();
    let price = this.refs.precioPlato.value.trim();
    let image = this.refs.imagenPlato.value.trim();
    let description = this.refs.descriptionPlato.value.trim();
    let type = this.refs.tipodeComida[this.refs.tipodeComida.selectedIndex].value;
    let string = '';
    let calories = '';
    let totalFat = '';
    let saturatedFat =  '';
    let transFat = '';
    let cholesterol = '';
    let sodium = '';
    let totalCarbohydrates = '';
    let dietaryFibers = '';
    let sugar = '';
    let protein = '';
    let vitaminA = '';
    let vitaminC = '';
    let calcium = '';
    let iron = '';
    if (name != "" && price != "" && description != "") {
      let dish = {
        name,
        price,
        description,
        type,
        image,
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
      }
      Meteor.call('dishes.insert', dish);
      let platoAgregado = document.getElementById("platoAgregadoToast");
      platoAgregado.classList.add("show");
      platoAgregado.innerHTML = "Se ha agregado un plato nuevo."
      setTimeout(function() {
        platoAgregado.classList.remove("show");
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'none';
      }, 3000);
    } else {

      let platoAgregado = document.getElementById("platoAgregadoToast");
      platoAgregado.classList.add("show");
      platoAgregado.innerHTML = "No ha ingresado todos los datos."
      setTimeout(function() {
        platoAgregado.classList.remove("show");
      }, 3000);
    }

  }

  componentDidMount() {
    this.dishesTracker = Tracker.autorun(() => {
      Meteor.subscribe('dishes');
      const dishes = Dishes.find().fetch();
      this.setState({ dishes });
    });
  }

  componentWillUnmount() {
    this.dishesTracker.stop();
  }

  openAgregar(){
    this.refs.nombrePlato.value = "";
    this.refs.precioPlato.value = "";
    this.refs.descriptionPlato.value = "";
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'block';
  }

  closeAgregar(){
    var modal = document.getElementById('simpleModal');
    modal.style.display = 'none';
  }

  agregarFinal() {
    let platoAgregado = document.getElementById("platoAgregadoToast");
    platoAgregado.classList.add("show");
    platoAgregado.innerHTML = "Se ha agregado un plato nuevo."
    let name = this.refs.nombrePlato.value;
    let price = this.refs.precioPlato.value;
    let descript = this.refs.descriptionPlato.value;
    let type = this.refs.tipodeComida.selected;
    let image = this.refs.imagenPlato.value;
    setTimeout(function() {
      platoAgregado.classList.remove("show");
      name = "";
      price = "";
      descript = "";
    }, 3000);
  }


  render() {
    return (
      <div>
        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />
        <div className="pos-f-t ">
          <nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span> Menú </span>
            </button>
          </nav>

          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4 d-flex justify-content-center" id="BackgroundNavBar">
              <ul className="list-group" id="PlateList">
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(<Entree />, document.getElementById('SelectedMenu'));}} >
                  Entradas
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(renderPlatos("Soups"), document.getElementById('SelectedMenu'));}} >
                  Sopas
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {ReactDOM.render(renderPlatos("Salads"), document.getElementById('SelectedMenu'));}}>
                  Ensaladas
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Wraps />, document.getElementById('SelectedMenu'));
                  }}>
                  Wraps
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<LittleItaly />, document.getElementById('SelectedMenu'));
                  }}>
                  Little Italy (Pastas & Pizettas)
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Sandwiches />, document.getElementById('SelectedMenu'));
                  }}>
                  Sándwiches
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<SideDish />, document.getElementById('SelectedMenu'));
                  }}>
                  Acompañantes
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Breakfasts />, document.getElementById('SelectedMenu'));
                  }}>
                  Desayunos
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Desserts />, document.getElementById('SelectedMenu'));
                  }}>
                  Postres
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Juices />, document.getElementById('SelectedMenu'));
                  }}>
                  Jugos
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Drinks />, document.getElementById('SelectedMenu'));
                  }}>
                  Bebidas
                </a>
              </ul>
            </div>
          </div>
        </div>

        <section id="Menu" >
          <div id="SelectedMenu"><Entree dishes={this.state.dishes}/></div>
        </section>

        <div id="wrapper">
          <button id="modalBtn" className = "btn_Agregar" onClick={this.openAgregar.bind(this)}>Agregar Plato</button>
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
              <h2>Agregar Plato</h2>
            </div>
          </div>
          {/* Body */}
          <div className="modal-body">
            <form className="contactModal" onSubmit={this.onSubmit.bind(this)}>
              <div className="body1">
                <p>
                  <label id="labelAgregar">Nombre Plato</label>
                  <input id="inputAgregar" ref = "nombrePlato" type="text" placeholder='Nombre Plato' maxLength='140' />
                </p>
                <p>
                  <label id="labelAgregar">Precio</label>
                  <input id="inputAgregar"  ref = "precioPlato" type="number" placeholder='Precio Plato' maxLength='140' />
                </p>
                <p>
                  <label id="labelAgregar">URL De Imagen</label>
                  <input id="inputAgregar"  ref = "imagenPlato" type="text" placeholder='https://www.google.com/' />
                </p>
                <p>
                  <label id="labelAgregar">Descripción Plato</label>
                  <textarea  id="inputAgregar"  ref="descriptionPlato" rows="5" placeholder='Enter Descripción Plato' maxLength='140'></textarea>
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
                <div className="nutritionLabel" id="nutrilabel" style={{widh: "50%"}}>
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

                    <div className="line m" style={{fontWeight: "bold"}}>
                      Amount Per Serving
                    </div>

                    <div className="line">
                      <div className="fr">
                        Calories from Fat 0
                      </div>

                      <div>
                        <b>Calories</b> 0
                      </div>
                    </div>

                    <div className="bar2"></div>

                    <div className="line ar" style={{fontWeight: "bold"}}>
                      % Daily Value<sup>*</sup>
                    </div>

                    <div className="line">
                      <div className="dv">
                        <b>0</b>%
                      </div><b>Total Fat</b> 0g
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
                      </div><b>Cholesterol</b> 0mg
                    </div>

                    <div className="line">
                      <div className="dv">
                        <b>0</b>%
                      </div><b>Sodium</b> 0mg
                    </div>

                    <div className="line">
                      <div className="dv">
                        <b>0</b>%
                      </div><b>Total Carbohydrates</b> 0g
                    </div>

                    <div className="line indent">
                      <div className="dv">
                        <b>0</b>%
                      </div>Dietary Fiber 0g
                    </div>

                    <div className="line indent">
                      Sugars 0g
                    </div>

                    <div className="line">
                      <b>Protein</b> 0g
                    </div>

                    <div className="bar1"></div>

                    <div className="line vitaminA">
                      <div className="dv">
                        0%
                      </div>Vitamin A
                    </div>

                    <div className="line vitaminC">
                      <div className="dv">
                        0%
                      </div>Vitamin C
                    </div>

                    <div className="line calcium">
                      <div className="dv">
                        0%
                      </div>Calcium
                    </div>

                    <div className="line iron">
                      <div className="dv">
                        0%
                      </div>Iron
                    </div>

                    <div className="dvCalorieDiet line">
                      <div className="calorieNote">
                        <span className="star">*</span> Percent Daily Values are based on a 2000 calorie diet.<br/>
                        <div className="ingredientListDiv">
                          <b className="active" id="ingredientList">INGREDIENTS:</b> None
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>  
            </form>
            <p>
              <button className="agregarFinalBtn" onClick = {this.agregarFinal.bind(this)}>Agregar Plato</button>
            </p>
            <div id = "platoAgregadoToast"></div>
          </div>
          {/* Footer */}
          <div className="modal-footer"></div>
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
          <img className="card-img"  alt="Card image cap" src={dish.image}/>
          <div className="card-content">
            <h3 className="card-titulo">{dish.name}</h3>
            <p className="card-price">L. {dish.price}</p>
            <p className="card-desc">{dish.description}</p>
            <ButtonPlato id={dish._id}></ButtonPlato>
          </div>
        </div>
      </div>
    )
  });
}

class ButtonPlato extends Component {
  deleteDish(id) {
    Meteor.call('dishes.delete', id);
  }
  render() {
    return (
      <div className="btn-bg bg-2">
        <div className="btn btn-2">
          <button onClick={() => this.deleteDish(this.props.id)}>Delete</button>
        </div>
      </div>
    );
  }
}
