import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
  Meteor.publish('orders.getClientOrders', function() {
    return Orders.find({ userId: this.userId });
  });
  Meteor.publish('orders', function() {
    return Orders.find({});
  });
}
Meteor.methods({
  'orders.insert'(order) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
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
  },
  'orders.cambiarFechaDespacho'(id, fecha) {
    Orders.update(id, { $set: { fechaDespacho: fecha } });
  },
  'orders.setHidden'(id) {
    Orders.update(id, { $set: { status: 'Hidden' } });
  },
  'orders.setPending'(id) {
    Orders.update(id, { $set: { status: 'Pending' } });
  },
  'orders.setPreOrder'(id) {
    Orders.update(id, { $set: { status: 'PreOrder' } });
  },
  'orders.setInProgress'(id) {
    Orders.update(id, { $set: { status: 'InProgress' } });
  },
  'orders.delete'(id) {
    Orders.remove(id);
  }
});
