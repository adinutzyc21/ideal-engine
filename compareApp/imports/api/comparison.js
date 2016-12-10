import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comparison = new Mongo.Collection('comparison');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('comparison', function comparisonPublication() {
    return Comparison.find();
  });
}

Meteor.methods({

  'comparison.removeRow'(id) {
    check(id, String);

    Comparison.remove(id);
  },

  'comparison.removeColumn'(column) {
    check(column, String);

    Comparison.update({},
      { $unset: { [column]: "" } },
      { multi: true }
    );
  },

  'comparison.insertRow'(data) {
    check(data, Object);

    Comparison.insert(data);
  },

  'comparison.insertColumn'(column, value) {
    check(column, String);
    check(value, Object);

    Comparison.update(value.id, {
      $set: { [column]: [value.text] }
    });
  }
});