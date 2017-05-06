import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Row, Col } from './comparison.js';

Meteor.methods({
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
  insertRow(tableId, colId, rowData, isFirst) {
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

    // add the scoreModifier
    rowData.scoreModifier = 0;
    // add the tableId to the row structure
    rowData.tableId = tableId;
    // insert the query into the Row table
    Row.insert(rowData);
  },

  /**
   * Delete a row given its id.
   * @param {String} rowId - the id of the row to delete
   */
  deleteRow(rowId) {
    check(rowId, String);

    Row.remove(rowId);
  },

  /**
   * Delete a column given its id.
   * This is done by removing the column from Col by id and unsetting
   * the values of Row that match id.
   * @param {String} colId - the id of the column to delete
   */
  deleteColumn(colId) {
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
  insertColumn(tableId, colId, colData) {
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
  updateRowInsertColumn(rowId, colId, colDataRow) {
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
  updateRowInsertScore(rowId, score) {
    check(rowId, String);
    check(score, Number);

    Row.update(rowId, {
      $set: {
        score,
      },
    });
  },
});
