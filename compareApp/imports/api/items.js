import { Mongo } from 'meteor/mongo';
 
export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('items', function itemsPublication() {
    return Items.find();
  });
}