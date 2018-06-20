import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';
import './../client/styles/cart';

export default class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      value : 0,
      subtotal : 0
    };
  }
  onActual(){
    let items = [
      {
        product:{
          image:"https://www.imanet.org/-/media/87b3b2fc07ec476e98f9279f5cc0fb1e.ashx?h=200&w=200&la=en&hash=8650EEABE56B14E9CFB3E2469E3F3C32C86D4FE0",
          name:"Pasta",
          description:"sin queso porfavor",
        },
        price:22,
        quantity:2
      },
      {
        product:{
          image:"hamburguesa1",
          name:"Italian Hamburger",
          description:"",
        },
        price:198.00,
        quantity:1
      }
    ];
    let rows = items.map((item) =>
    <tr>
      <th scope="row">
        <div className="card">
          <img className="card-img-top" src={item.product.image} alt="Image food"/>
            <div className="card-body">
              <h5 className="card-title">{item.product.name}</h5>
              <textarea className="card-text" type="text" name="description" value={item.product.description || "Observacion"} maxLength="280"/>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      </th>
      <td>Lps.{item.price.toFixed(2)}</td>
      <td>{item.quantity}</td>
      {this.Subtotal(item.price,item.quantity)}
    </tr>
    );

    let newVal = (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <div>
        <h3>Subtotal:{this.state.subtotal}</h3>
        <h3>ISV: 15%</h3>
        <h2>Total:{(this.state.subtotal*0.15)+this.state.subtotal}</h2>
        <button className="btn btn-primary">Confirmar</button>
      </div>
      </div>
    );
    return this.setState({...this.state,value: newVal});
  }

  onHistory(){
    let newVal = 2;
    return this.setState({...this.state, value: newVal})
  }

  Subtotal(price,quantity){
    let sub = this.state.subtotal+(price*quantity);
    return this.setState({...this.state, subtotal: sub});
  }

  render(){
    return (
      <div className="container">
        <h1>Detalle de la Orden</h1>
        <p>Revise su orden, siga ordenando o inicie el proceso de pago.</p>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <h1><a className="" onClick={this.onActual.bind(this)}>Orden Actual</a></h1>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <h1><a className="" onClick={this.onHistory.bind(this)}>Historial de Ordenes</a></h1>
          </div>
        </div>
        {this.state.value}
      </div>
    );
  }
}
