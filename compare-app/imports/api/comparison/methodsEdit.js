import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Row, Col } from './comparison.js';

Meteor.methods({
  /**
   * Update the scoreModifier field for the given row id
   * @param {String} rowId - the id of the row to update
   * @param {Number} value - the new value of the scoreModifier field
   */
  updateScoreModifier(rowId, scoreModifier) {
    check(rowId, String);
    check(scoreModifier, Number);

    Row.update(rowId, {
      $set: {
        scoreModifier,
      },
    });
  },

  /**
   * Update the column field in Mongo (either name or score)
   * @param {String} colId - the id of the column being edited
   * @param {String} type - the type of element being edited ('name' or 'score')
   * @param {String} value - the value to be written in the database
   */
  updateColumnFieldInPlace(colId, type, value) {
    check(colId, String);
    check(type, String);
    check(value, String);

    Col.update(colId, {
      $set: {
        [type]: value,
      },
    });
  },

   /**
   * Update the row field in Mongo (either 'value' or 'score')
   * @param {String} rowId - the id of the row being edited
   * @param {String} colId - the id of the column being edited
   * @param {String} type - the type of element being edited ('option', 'data' or 'score')
   * @param {String} value - the value to be written in the database
   */
  updateRowFieldInPlace(rowId, colId, type, value) {
    check(rowId, String);
    check(colId, String);
    check(type, String);
    check(value, String);

    const element = colId + '.' + type;

    Row.upsert(rowId, {
      $set: {
        [element]: value,
      },
    });
  },
});
