import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';
import { Orders } from '../api/orders';
import './../client/styles/cart';

export default class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      orders: [],
      value : 0,
      cart: []
    };
  }
  componentDidMount() {
    this.ordersTracker = Tracker.autorun(() => {
      Meteor.subscribe('client-orders');
      const orders = Orders.find().fetch();
      this.setState({ orders });
    });

    const carrito = this.props.history.location.state;
    this.setState({...this.state, cart: carrito});

  };
  componentWillUnmount() {
    this.ordersTracker.stop();
  };
  onActual(){

    let price = 0;
    let getPrice = this.state.cart.platos.forEach((item) => {
      price += item.precio*item.cantidad;
    });
    console.log(price);
    let order = {
      products: items,
      price
    };
    //aqui esta como se insert
    Meteor.call('orders.insert', order);
    //ejemplo de como se marca pending/completed
    let id = '9qxdEChNBWKh2PSvD';
    Meteor.call('orders.setPending', id);
    let rows = this.state.cart.platos.map((item, i) =>
    <tr key={i}>
      <th scope="row">
        <div className="card">
          <img className="card-img-top" src={item.imagen} alt="Image food"/>
            <div className="card-body">
              <h5 className="card-title">{item.plato}</h5>
              <textarea className="card-text" type="text" name="description" value="Observacion" maxLength="280"/>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      </th>
      <td>Lps.{parseInt(item.precio).toFixed(2)}</td>
      <td>{item.cantidad}</td>
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
        <h3>Subtotal:Lps.{price.toFixed(2)}</h3>
        <h3>ISV: 15%</h3>
        <h2>Total:Lps.{((price*0.15)+price).toFixed(2)}</h2>
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
