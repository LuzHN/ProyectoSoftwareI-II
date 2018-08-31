import React, { Component } from 'react';
import { Dishes } from '../api/dishes';

let dishID;

class ButtonPlato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plato: this.props.plato
    };
  }

  loadNutritionalFacts() {
    //carga los nutritional facts del platillo

    $('#TotalFatPercentage').text(
      parseFloat(
        (parseInt(this.state.plato.nutritionFacts.totalFat) / 65.0) * 100
      ).toFixed(1)
    );
    $('#TotalFat').text(parseInt(this.state.plato.nutritionFacts.totalFat));
    $('#TotalSatFatPercentage').text(
      parseFloat(
        (parseInt(this.state.plato.nutritionFacts.saturatedFat) / 20.0) * 100
      ).toFixed(1)
    );
    $('#TotalSatFat').text(
      parseInt(this.state.plato.nutritionFacts.saturatedFat)
    );
    $('#CholesterolPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.cholesterol) / 300.0) * 100
      ).toFixed(1)
    );
    $('#TotalCholesterol').text(
      parseInt(this.state.plato.nutritionFacts.cholesterol)
    );
    $('#SodiumPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.sodium) / 2400.0) * 100
      ).toFixed(1)
    );
    $('#TotalSodium').text(parseInt(this.state.plato.nutritionFacts.sodium));
    $('#ProteinPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.protein) / 50.0) * 100
      ).toFixed(1)
    );
    $('#TotalProtein').text(parseInt(this.state.plato.nutritionFacts.protein));
    $('#CarbsPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.totalCarbohydrates) / 300.0) *
          100
      ).toFixed(1)
    );
    $('#TotalCarbs').text(
      parseInt(this.state.plato.nutritionFacts.totalCarbohydrates)
    );
    $('#DietaryFiberPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.dietaryFibers) / 25.0) * 100
      ).toFixed(1)
    );
    $('#TotalDietaryFiber').text(
      parseInt(this.state.plato.nutritionFacts.dietaryFibers)
    );
    $('#SugarPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.sugar) / 50.0) * 100
      ).toFixed(1)
    );
    $('#TotalSugar').text(parseInt(this.state.plato.nutritionFacts.sugar));
    $('#VitaminAPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.vitaminA) / 1000.0) * 100
      ).toFixed(1)
    );
    $('#TotalVitaminA').text(
      parseInt(this.state.plato.nutritionFacts.vitaminA)
    );
    $('#VitaminCPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.vitaminC) / 60.0) * 100
      ).toFixed(1)
    );
    $('#TotalVitaminC').text(
      parseInt(this.state.plato.nutritionFacts.vitaminC)
    );
    $('#IronPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.iron) / 14.0) * 100
      ).toFixed(1)
    );
    $('#TotalIron').text(parseInt(this.state.plato.nutritionFacts.iron));
    $('#CalciumPercentage').text(
      parseFloat(
        (parseInt(this.props.plato.nutritionFacts.calcium) / 1100.0) * 100
      ).toFixed(1)
    );
    $('#TotalCalcium').text(parseInt(this.state.plato.nutritionFacts.calcium));
    $('#TotalCalories').text(
      parseInt(this.state.plato.nutritionFacts.calories)
    );
    $('#TotalTrans').text(parseInt(this.state.plato.nutritionFacts.transFat));
  }

  getDish() {
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
                this.props.onClick();
              } else if (
                this.props.texto === 'Comprar' ||
                this.props.text === 'Historial'
              ) {
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
