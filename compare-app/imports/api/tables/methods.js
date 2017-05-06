import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tables } from './tables.js';

Meteor.methods({
  removeTable(id) {
    check(id, String);

    Tables.remove(id);
  },

  insertTable(query) {
    check(query, Object);
    query.lastModified = new Date();

    Tables.insert(query);
  },
});
