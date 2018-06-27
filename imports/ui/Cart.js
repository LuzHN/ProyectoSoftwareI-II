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
import OrdenPlato from '../client/ui/components/ordenesCart.js';

export default class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      orders: [],
      value : 0,
      cart: [],
      orden:{
        estado: "",
        platos: []
      },
      componentes: []
    };
  }

  componentDidMount() {
    // this.ordersTracker = Tracker.autorun(() => {
    //   Meteor.subscribe('client-orders');
    //   const orders = Orders.find().fetch();
    //   this.setState({ orders });
    // });

    const carrito = this.props.history.location.state;
    this.setState({...this.state, cart: carrito});

    const platosNuevo = carrito.platos.map((platito)=>{
      return {...platito, descripcion: ""};
    });
    const platos = {estado: "Preorden", platos: platosNuevo};
    this.setState({...this.state, orden: platos});

  };
  componentWillUnmount() {
    this.ordersTracker.stop();
  };

  handleDescriptionChange=(evt)=>{
    console.log(this.state);
    console.log(this);
    // console.log(i);
    console.log(evt.target.attributes.i.value);
    const orden = this.state.orden.platos;
    orden[evt.target.attributes.i.value].descripcion = event.target.value;
    console.log(orden[evt.target.attributes.i.value]);
    this.setState({...this.state, orden});
    // console.log(event.target.value)
  };

  confirmar = (evt) => {
    let orden = this.state.orden;
    orden.estado = "Preorden";
    orden.platos = [];
    orden.products = [];
    console.log(orden);
    for (var i = 0; i < this.state.componentes.length; i++) {
      orden.products.push({
        cantidad: this.state.componentes[i].state.cantidad,
        descripcion: this.state.componentes[i].state.descripcion,
        imagen: this.state.componentes[i].state.imagen,
        plato: this.state.componentes[i].state.titulo,
        precio: this.state.componentes[i].state.precio
      });
    }
    orden.cliente =Meteor.user().profile.firstName;
    console.log(orden);
    Meteor.call('orders.insert', orden);
    orden = {
      estado: "",
      platos: []
    }
    this.setState({...this.state, orden});

  }


  onActual=()=>{

    //Calcular el precio
    let price = 0;
    let getPrice = this.state.orden.platos.forEach((item) => {
      price += item.precio*item.cantidad;
    });



    //Crear orden internamente
    // let order = {
    //   products: this.state.orden.platos,
    //   cliente: Meteor.user().profile.firstName,
    //   price
    // };

    //aqui esta como se insert
    // Meteor.call('orders.insert', order);
    //ejemplo de como se marca pending/completed
    // let id = '9qxdEChNBWKh2PSvD';
    // Meteor.call('orders.setPending', id);

    let rows = this.state.orden.platos.map((item, i) =>
      <OrdenPlato
        ref={(ref)=>{
          let componentes = this.state.componentes;
          componentes.push(ref);
          this.setState({...this.state, componentes})
        }}
        key={i}
        imagen={item.imagen}
        titulo={item.plato}
        precio={parseInt(item.precio).toFixed(2)}
        cantidad={item.cantidad}/>
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
        <button className="btn btn-primary" onClick={this.confirmar}>Confirmar</button>
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
            <h1><a className="" onClick={this.onActual}>Orden Actual</a></h1>
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
