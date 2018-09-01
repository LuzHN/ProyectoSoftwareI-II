import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
  Meteor.publish('client-orders', () => {
    return Orders.find({ userId: this.userId });
  });
  Meteor.publish('orders', () => {
    return Orders.find({});
    // if (Roles.userIsInRole(Meteor.userId(), 'employee') || Roles.userIsInRole(Meteor.userId(), 'administrator')) {
    //   return Orders.find({}); 
    // }
  });
}
Meteor.methods({
  'orders.insert'(order) {
    Orders.insert({
      status: '',
      products: order.products,
      price: order.price,
      direccion: order.direccion,
      userId: this.userId,
      cliente: order.cliente,
      fechaEntrada: order.fechaEntrada,
      fechaDespacho: order.fechaDespacho
    });
  },
  'orders.setDispatched'(id) {

    Orders.update(id, { $set: { status: 'Dispatched' } });
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { status: 'Dispatched' } });
    // }
  },
  'orders.setPending'(id) {
    Orders.update(id, { $set: { status: 'Pending' } });
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { status: 'Pending' } });
    // }
  },
  'orders.setPreOrder'(id) {
    Orders.update(id, { $set: { status: 'PreOrder' } });
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { status: 'PreOrder' } });
    // }
  },
  'orders.setInProgress'(id) {
    Orders.update(id, { $set: { status: 'InProgress' } });

    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { status: 'InProgress' } });
    // }
  },
  'orders.cambiarFechaDespacho'(id, fecha) {
    Orders.update(id, { $set: { fechaDespacho: fecha } });
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { fechaDespacho: fecha } });
    // }
  },
  'orders.setHidden'(id) {
    Orders.update(id, { $set: { status: 'Hidden' } });
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.update(id, { $set: { status: 'Hidden' } });
    // }
  },
  'orders.delete'(id) {
    Orders.remove(id);
    // if (Roles.userIsInRole(Meteor.userId(), 'employee')) {
    //   Orders.remove(id);
    // }
  }
});
