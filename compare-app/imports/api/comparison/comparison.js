import { Mongo } from 'meteor/mongo';

/**
 * The rows are the various options in the table
 */
export const Row = new Mongo.Collection('row');

/**
 * The columns are the various criteria for each option
 */
export const Col = new Mongo.Collection('col');

/*
 Row structure: {
   {  '_id' : 'id1',
      'score' : 5,
      'hId1' : { 'value' : 'Apt 1' },
      'hId2' : { 'value' : '800 sqft', 'score' : 1 },
      'hId3' : { 'value' : '$800', 'score' : 3 },
      etc.
      'tableId' : 'tId1'
   }
   {  '_id' : 'id2',
      'score' : 5,
      'hId1' : { 'value' : 'Apt 2' },
      'hId2' : { 'value' : '780 sqft', 'score' : 10 },
      'hId3' : { 'value' : '$700', 'score' : 3 },
      etc.
      'tableId' : 'tId1'
   }
   etc.
 }
 Col structure: {
   { '_id' : 'hId1', 'name' : 'Option Name', 'tableId' : 'tId1' },
   { '_id' : 'hId2', 'name' : 'Rent', 'score' : 9, 'tableId' : 'tId1' },
   { '_id' : 'hId3', 'name' : 'Surface', 'score' : 5, 'tableId' : 'tId1' },
   { '_id' : 'hId4', 'name' : 'Price', 'score' : 5, 'tableId' : 'tId1' },
   { '_id' : 'hId5', 'name' : 'CPU', 'score' : 5, 'tableId' : 'tId4' }
   etc.
 }
*/
