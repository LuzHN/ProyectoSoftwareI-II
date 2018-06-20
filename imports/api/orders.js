import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
  Meteor.publish('client-orders', function () {
    return Orders.find({ userId: this.userId });
  });
  Meteor.publish('orders', function () {
    return Orders.find({});
  });
}
//resource.action naming convention
Meteor.methods({
  'orders.insert'(order) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Orders.insert({
      status: '',
      products: order.products,
      price: order.price,
      userId: this.uderId
    });
  },
  'orders.setCompleted'(id) {
    Orders.update(id, {$set: { status: 'Completed'}});
  },
  'orders.setPending'(id) {
    Orders.update(id, {$set: { status: 'Pending'}});
  }
});
