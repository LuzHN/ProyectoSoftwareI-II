import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
  Meteor.publish('orders.getClientOrders', function() {
    return Orders.find({ userId: this.userId });
  });
  Meteor.publish('orders', () => {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'administrator') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user') ||
      Roles.userIsInRole(Meteor.userId(), 'client')
    ) {
      return Orders.find({});
    }
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
      fechaDespacho: order.fechaDespacho,
      fechaCancelado: order.fechaCancelado
    });
  },
  'orders.setDispatched'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { status: 'Dispatched' } });
    }
  },
  'orders.setPending'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { status: 'Pending' } });
    }
  },
  'orders.setPreOrder'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { status: 'PreOrder' } });
    }
  },
  'orders.setInProgress'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { status: 'InProgress' } });
    }
  },
  'orders.cambiarFechaDespacho'(id, fecha) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { fechaDespacho: fecha } });
    }
  },
  'orders.setHidden'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.update(id, { $set: { status: 'Hidden' } });
    }
  },
  'orders.delete'(id) {
    if (
      Roles.userIsInRole(Meteor.userId(), 'employee') ||
      Roles.userIsInRole(Meteor.userId(), 'normal-user')
    ) {
      Orders.remove(id);
    }
  },
  'orders.cambiarFechaCancelacion'(id, fecha) {
    if (Roles.userIsInRole(Meteor.userId(), 'normal-user')) {
      Orders.update(id, { $set: { fechaCancelado: fecha } });
    }
  },
  'orders.setCanceled'(id) {
    if (Roles.userIsInRole(Meteor.userId(), 'normal-user')) {
      Orders.update(id, { $set: { status: 'Canceled' } });
    }
  }
});
