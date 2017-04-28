import { Meteor } from 'meteor/meteor';
import { Row, Col } from './comparison.js';
/**
 * This code only runs on the server.
 * Publish the tables so we can subscribe and retrieve the data.
 */
Meteor.publish('row', () => Row.find());

Meteor.publish('col', () => Col.find());
