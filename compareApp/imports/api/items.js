import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('items', function itemsPublication() {
    return Items.find();
  });
}

Meteor.methods({

  'items.removeRow'(id) {
    check(id, Meteor.Collection.ObjectID);

    Items.remove(id);
  },

  'items.removeColumn'(column) {
    check(column, String);

    Items.update({},
      { $unset: { [column]: "" } },
      { multi: true }
    );
  },

  'items.insertRow'(data) {
    check(data, Object);

    Items.insert(data);
  },

  'items.insertColumn'(column, value) {
    check(column, String);
    check(value, Object);

    Items.update(value.id, {
      $set: { [column]: [value.text] }
    });
  }
});