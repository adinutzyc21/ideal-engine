import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
 * Table containing all the names
 */
export const Tables = new Mongo.Collection('tables');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tables', () => Tables.find());
}

Meteor.methods({

  'tables.removeTable'(id) { // eslint-disable-line object-shorthand
    check(id, String);

    Tables.remove(id);
  },

  'tables.insertTable'(query) { // eslint-disable-line object-shorthand
    check(query, Object);
    query.lastModified = new Date();

    Tables.insert(query);
  },
});
