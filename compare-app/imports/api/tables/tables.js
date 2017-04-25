import { Mongo } from 'meteor/mongo';

/**
 * Table containing all the names
 */
export const Tables = new Mongo.Collection('tables');
