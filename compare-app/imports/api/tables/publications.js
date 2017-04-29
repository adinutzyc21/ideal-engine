
import { Meteor } from 'meteor/meteor';
import { Tables } from './tables.js';

Meteor.publish('tables', () => Tables.find());
