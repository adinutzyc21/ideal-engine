import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tables } from './tables.js';

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
