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
      subtotal : 0
    };
  }
  componentDidMount() {
    this.ordersTracker = Tracker.autorun(() => {
      Meteor.subscribe('client-orders');
      const orders = Orders.find().fetch();
      this.setState({ orders });
    });
  };
  componentWillUnmount() {
    this.ordersTracker.stop();
  };
  onActual(){
    let items = [
      {
        product:{
          image:"https://www.imanet.org/-/media/87b3b2fc07ec476e98f9279f5cc0fb1e.ashx?h=200&w=200&la=en&hash=8650EEABE56B14E9CFB3E2469E3F3C32C86D4FE0",
          name:"Pasta",
          description:"sin queso porfavor",
          quantity:2
        },
        price:22,
      },
      {
        product:{
          image:"hamburguesa1",
          name:"Italian Hamburger",
          description:"",
          quantity:1
        },
        price:198.00,
      }
    ];
    let price = 0;
    let getPrice = items.forEach((item) => {
      price += item.price;
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
    let rows = items.map((item) =>
    <tr>
      {this.CalcSubtotal(item.price, item.quantity)}
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
        <h3>Subtotal:Lps.{this.state.subtotal.toFixed(2)}</h3>
        <h3>ISV: 15%</h3>
        <h2>Total:Lps.{((this.state.subtotal*0.15)+this.state.subtotal).toFixed(2)}</h2>
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

  CalcSubtotal(price,quantity){
    let subtotal = 23;
    return this.setState({...this.state, subtotal: subtotal});
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
