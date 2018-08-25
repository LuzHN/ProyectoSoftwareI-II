import React, { Component } from 'react';
import { Dishes } from '../api/dishes';

let dishID;

class ButtonPlato extends Component {

  constructor(props){
    super(props);
    this.state = {
      plato : this.props.plato
    };
  }

  loadNutritionalFacts() { //carga los nutritional facts del platillo

    $('#TotalFatPercentage').text(parseFloat((parseInt(this.state.plato.nutritionFacts.totalFat) / 65.0) * 100).toFixed(1));
    $('#TotalSatFatPercentage').text(parseFloat((parseInt(this.state.plato.nutritionFacts.saturatedFat) / 20.0) * 100).toFixed(1));
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
 
  
  getDish(){
    dishID = this.props.plato._id;
    const dish = Dishes.findOne({ _id: this.props.plato._id });
    this.loadNutritionalFacts(); //carga el modal con toda la info del plato
  }


  render() {
    return (
      <div className="btn-bg bg-2">
        <div className="btn btn-2">
          <button
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (this.props.texto === 'Informacion Nutricional') {
                this.getDish();
                this.props.onClick()
              } else if (this.props.texto === 'Comprar') {
                this.props.onClick();
              } else {
                this.props.onClick(
                  this.props.plato,
                  this.props.precio,
                  this.props.imagen
                );
              }
            }}
          >
            {this.props.texto}
          </button>
        </div>
      </div>
    );
  }
}

export default ButtonPlato;
