import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
 * The rows are the various options in the table
 */
export const Row = new Mongo.Collection('row');

/**
 * The columns are the various criteria for each option
 */
export const Col = new Mongo.Collection('col');

/**
 * This code only runs on the server.
 * Publish the tables so we can subscribe and retrieve the data.
 */
if (Meteor.isServer) {
  Meteor.publish('row', () => Row.find());

  Meteor.publish('col', () => Col.find());
}

Meteor.methods({
  /**
   * Populate the table, given its id.
   * @param {string} tableId - the id of the table to populate
   */
  'comparison.populateTables'(tableId) { // eslint-disable-line object-shorthand
    check(tableId, String);

    const rows = [
      [
        { value: 'Lorem' },
        { value: '$800', score: 1 },
        { value: '$200', score: 3 },
        { value: '70%', score: 1 },
        { value: '10 mi', score: 4 },
        { value: '720 sqft', score: 1 },
      ], [
        { value: 'Ipsum' },
        { value: '$780', score: 10 },
        { value: '$100', score: 3 },
        { value: '78%', score: 2 },
        { value: '12 mi', score: 4 },
        { value: '780 sqft', score: 7 },
      ], [
        { value: 'Dolor' },
        { value: '$720', score: 9 },
        { value: '$50', score: 4 },
        { value: '79%', score: 4 },
        { value: '2 mi', score: 10 },
        { value: '780 sqft', score: 7 },
      ], [
        { value: 'Sit' },
        { value: '$700', score: 4 },
        { value: '$0', score: 5 },
        { value: '58%', score: 1 },
        { value: '2 mi', score: 2 },
        { value: '780 sqft', score: 7 },
      ], [
        { value: 'Amet' },
        { value: '$700', score: 6 },
        { value: '$150', score: 2 },
        { value: '89%', score: 2 },
        { value: '15 mi', score: 2 },
        { value: '880 sqft', score: 2 },
      ],
    ];

    const cols = [
      { name: 'Option Name' },
      { name: 'The Rent', score: 9 },
      { name: 'My Deposit', score: 2 },
      { name: 'Rating', score: 7 },
      { name: 'Distance to Work', score: 5 },
      { name: 'Size', score: 8 },
    ];

    const colIds = [];
    // create the row
    for (let i = 0, len = cols.length; i < len; i++) {
      // Create a new ObjectID for the column
      const colId = new Meteor.Collection.ObjectID()._str;
      // create the column
      const colData = cols[i];
      colData._id = colId;

      colData.tableId = tableId;

      colIds.push(colId);
      // insert the column
      Col.insert(colData);
    }

    // insert the corresponding row
    for (let i = 0, len = rows.length; i < len; i++) {
      const rowData = {};
      for (let j = 0, len2 = colIds.length; j < len2; j++) {
        rowData[colIds[j]] = rows[i][j];
        rowData.score = 5;
      }
      rowData.tableId = tableId;
      Row.insert(rowData);
    }
  },

  /**
   * Insert a row in the Row and Col tables.
   * If this is the first element, then insert the 'Option Name' header into the columns too.
   * @param {String} tableId - id of the current table
   * @param {String} colId - the ID of the first column, corresponds to header1 below
   * @param {Object} rowData - structure of the form
   *                { id, score, header1: {value1}, header2: {value2, score2},
   *                  header3: {value3, score3}... }
   * @param {Boolean} isFirst - is this the first row/column added?
   */
  'comparison.insertRow'(tableId, colId, rowData, isFirst) { // eslint-disable-line object-shorthand
    check(rowData, Object);
    check(colId, String);
    check(tableId, String);
    check(isFirst, Boolean);

    // is this the first option? If so, insert into the Col table too
    if (isFirst) {
      const colData = {};
      colData._id = colId;
      colData.tableId = tableId;
      colData.name = 'Option Name';
      Col.insert(colData);
    }

    // add the tableId to the row structure
    rowData.tableId = tableId;
    // insert the query into the Row table
    Row.insert(rowData);
  },

  /**
   * Delete everything (Row, Col) for the current table id.
   * @param {String} tableId - the id of the current table
   */
  'comparison.clearTable'(tableId) { // eslint-disable-line object-shorthand
    check(tableId, String);

    Row.remove({ tableId });
    Col.remove({ tableId });
  },

  /**
   * Delete a row given its id.
   * @param {String} rowId - the id of the row to delete
   */
  'comparison.deleteRow'(rowId) { // eslint-disable-line object-shorthand
    check(rowId, String);

    Row.remove(rowId);
  },

  /**
   * Delete a column given its id.
   * This is done by removing the column from Col by id and unsetting
   * the values of Row that match id.
   * @param {String} colId - the id of the column to delete
   */
  'comparison.deleteColumn'(colId) { // eslint-disable-line object-shorthand
    check(colId, String);

    // update row to remove all values matching colId
    Row.update({}, {
      $unset: {
        [colId]: '',
      },
    }, { multi: true });

    // remove colId data from Col
    Col.remove(colId);
  },

  /**
   * Insert a column in the Col table.
   * @param {String} tableId - the id of the current table
   * @param {String} colId - the id of the column to insert (to correspond to rows)
   * @param {Object} colData - structure of the form {name, score}
   */
  'comparison.insertColumn'(tableId, colId, colData) { // eslint-disable-line object-shorthand
    check(colData, Object);
    check(colId, String);
    check(tableId, String);

    // set the column id
    colData._id = colId;
    // set the table id
    colData.tableId = tableId;
    // insert the column
    Col.insert(colData);
  },

  /**
   * Update the Row table with the id of the column
   * @param {String} rowId - the id of the row to update
   * @param {String} colId - the id of the corresponding column to serve as fiels
   * @param {Object} colDataRow - the data that corresponds to colId in the table
   */
  'comparison.updateRowInsertColumn'(rowId, colId, colDataRow) {  // eslint-disable-line object-shorthand
    check(colDataRow, Object);
    check(colId, String);
    check(rowId, String);

    // for rowId, insert the colDataRow in the colId field
    Row.update(rowId, {
      $set: {
        [colId]: colDataRow,
      },
    });
  },

  /**
   * Update the score field for the given row id
   * @param {String} rowId - the id of the row to update
   * @param {Number} score - the score to insert in the score field
   */
  'comparison.updateRowInsertScore'(rowId, score) { // eslint-disable-line object-shorthand
    check(rowId, String);
    check(score, Number);

    Row.update(rowId, {
      $set: {
        score,
      },
    });
  },

  /**
   * Import CSV file
   * @param {String} tableId - the Id of the current table
   * @param {Array} data - the data from CSV parsed by Papa Parse
   * @param {Array} cols - the names of the columns retrieved by Papa Parse
   */
  'comparison.importCSV'(tableId, data, cols) { // eslint-disable-line object-shorthand
    check(tableId, String);
    check(data, Array);
    check(cols, Array);

    // id - name pair for the columns
    const colObj = [];

    // insert the columns into Mongo
    for (let i = 0, len = cols.length; i < len; i++) {
      // Create a new ObjectID for the column
      const colId = new Meteor.Collection.ObjectID()._str;

      // create the column data to insert into Mongo
      const colData = {};
      colData._id = colId;
      colData.tableId = tableId;
      colData.name = cols[i];
      // the first column does not have a score
      if (i !== 0) {
        colData.score = -1;
      }
      // insert the column into mongo
      Col.insert(colData);

      // save the id-name pair for row insertion below
      colObj.push({ id: colId, name: cols[i] });
    }

    // insert the corresponding rows into Mongo
    for (let i = 0, len = data.length; i < len; i++) {
      // an object with the data on the current row
      const row = data[i];

      // construct the data we end up inserting into Mongo
      const rowData = {};
      for (let j = 0, len2 = colObj.length; j < len2; j++) {
        const colId = colObj[j].id;
        const colName = colObj[j].name;
        rowData[colId] = { value: row[colName], score: -1 };
        rowData.score = -1;
      }
      rowData.tableId = tableId;
      // insert the row into Mongo
      Row.insert(rowData);
    }
  },
});

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
