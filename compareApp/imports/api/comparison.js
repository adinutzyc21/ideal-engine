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

    'comparison.deleteAll' () {
        Option.remove({});
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
    },

    'comparison.insertRow' (data) {
        check(data, Object);

        Option.insert(data);
    },

    'comparison.insertColumn' (column, value) {
        check(column, String);
        check(value, Object);

        Option.update(value.id, {
            $set: {
                [column]: value.query
            }
        });
    },
});