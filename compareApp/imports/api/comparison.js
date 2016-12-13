import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Option = new Mongo.Collection('option');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('option', function optionPublication() {
        return Option.find();
    });
}

/**
 * Criteria are the columns 
 */
export const Criterion = new Mongo.Collection('criterion');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('criterion', function criterionPublication() {
        return Criterion.find();
    });
}

Meteor.methods({
    'comparison.populateTables' (cols, rows) {
        var colIds = [];
        // create the row
        for (var i = 0, len = cols.length; i < len; i++) {
            // Create a new ObjectID for the column
            var colId = new Meteor.Collection.ObjectID()._str;
            // create the column
            var colData = cols[i];
            colData._id = colId;

            colIds.push(colId);
            // insert the column
            Criterion.insert(colData);
        }

        // insert the corresponding row
        for (var i = 0, len = rows.length; i < len; i++) {
            var rowData = {};
            for (var j = 0, len2 = colIds.length; j < len2; j++) {
                rowData[colIds[j]] = rows[i][j];
                rowData.score = 5;
            }
            Option.insert(rowData);
        }

    },

    'comparison.deleteAll' () {
        Option.remove({});
        Criterion.remove({});
    },

    'comparison.removeRow' (id) {
        check(id, String);

        Option.remove(id);
    },

    'comparison.removeColumn' (column) {
        check(column, String);

        Option.update({}, {
            $unset: {
                [column]: ""
            }
        }, { multi: true });

        Criterion.remove(column);
    },

    'comparison.insertFirstColumn' (id) {
        check(id, String);

        var data = { _id: id, name: "Option Name" }
        Criterion.insert(data);
    },

    'comparison.insertRow' (data) {
        check(data, Object);

        Option.insert(data);
    },

    'comparison.writeScores' (colId, rowId, score) {
        check(colId, String);
        check(rowId, String);
        check(score, Number);

        Option.update(rowId, {
            $set: {
                score: score
            }
        });

    },

    'comparison.insertColumn' (colQuery, colId) {
        check(colQuery, Object);
        check(colId, String);

        colQuery._id = colId;
        Criterion.insert(colQuery);
    },

    'comparison.updateColumn' (dataQuery, colId, rowId) {
        check(dataQuery, Object);
        check(colId, String);
        check(rowId, String);

        Option.update(rowId, {
            $set: {
                [colId]: dataQuery
            }
        });
    },
});