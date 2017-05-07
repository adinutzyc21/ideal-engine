import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Row, Col } from './comparison.js';

Meteor.methods({
  /**
   * Populate the table, given its id.
   * @param {string} tableId - the id of the table to populate
   */
  populateTable(tableId) {
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
      { name: 'Option Name', score: 200 },
      { name: 'The Rent', score: 9 },
      { name: 'My Deposit', score: 2 },
      { name: 'Rating', score: 7 },
      { name: 'Distance to Work', score: 5 },
      { name: 'Size', score: 8 },
    ];

    const colIds = [];
    // create the row
    for (let i = 0, len = cols.length; i < len; i++) {
      // create the column
      const colData = cols[i];

      colData.tableId = tableId;

      // insert the column
      const colId = Col.insert(colData);
      // save the ObjectID for the column
      colIds.push(colId);
    }

    // insert the corresponding row
    for (let i = 0, len = rows.length; i < len; i++) {
      const rowData = {};
      for (let j = 0, len2 = colIds.length; j < len2; j++) {
        rowData[colIds[j]] = rows[i][j];
        rowData.score = 5;
      }
      rowData.scoreModifier = 0;
      rowData.tableId = tableId;
      Row.insert(rowData);
    }
  },

  /**
   * Import CSV file
   * @param {String} tableId - the Id of the current table
   * @param {Array} data - the data from CSV parsed by Papa Parse
   */
  importCSV(tableId, data) {
    check(tableId, String);
    check(data, Array);
    // check(cols, Array);
    const cols = data[0];

    // id - name pair for the columns
    const colObj = [];

    let step = 1;
    let hasScore = false;
    let score = 5;
    // importing with scores?
    if (cols[1] === 'score') {
      step = 2;
      hasScore = true;
    }
    // insert the columns into Mongo
    for (let i = 0, len = cols.length; i < len - 1; i += step) {
      // create the column data to insert into Mongo
      const colData = {};
      colData.tableId = tableId;

      colData.name = cols[i];
      colData.score = 200;
      // the first column has a set score
      if (i !== 0) {
        if (hasScore) {
          score = cols[i + 1];
        }
        colData.score = score;
      }

      // insert the column into mongo;  save the ObjectID for the column
      const colId = Col.insert(colData);

      // save the id-name pair for row insertion below
      colObj.push({ id: colId, name: cols[i] });
    }

    // insert the corresponding rows into Mongo
    for (let i = 1, len = data.length; i < len; i++) {
      // an object with the data on the current row
      const row = data[i];

      // construct the data we end up inserting into Mongo
      const rowData = {};
      for (let j = 0, len2 = colObj.length; j < len2; j++) {
        const colId = colObj[j].id;

        if (hasScore) {
          score = row[(j * step) + 1];
        }
        if (j === 0) {
          // this is the row score instead
          rowData.score = score;
          // insert without score
          rowData[colId] = { value: row[j * step] };

        // insert with score
        } else {
          rowData[colId] = { value: row[j * step], score };
        }
      }
      if (hasScore) {
        rowData.scoreModifier = row[row.length - 1];
      } else rowData.scoreModifier = 0;
      rowData.tableId = tableId;
      // insert the row into Mongo
      Row.insert(rowData);
    }
  },

  /**
   * Delete everything (Row, Col) for the current table id.
   * @param {String} tableId - the id of the current table
   */
  clearTable(tableId) {
    check(tableId, String);

    Row.remove({ tableId });
    Col.remove({ tableId });
  },
});
