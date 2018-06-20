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
          image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg",
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
      price += item.price*item.product.quantity;
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
      <td>{item.product.quantity}</td>
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
