import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class TableDelete extends Component {

    /**
     * Delete a row from the Tables collection, given its id
     * @param id the id of the column
     */
    deleteTable(id) {
        Meteor.call('tables.removeTable', id);
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        // set the callback depending on the type of delete (row/col)
        var callback = this.deleteTable; //row
        var title = 'Delete Table ';
        if (this.props.name !== undefined){
            title += this.props.name;
        }

        // display the button
        return (
            <a role="button" data-toggle="tooltip" title={title}
                className={'btn btn-danger glyphicon glyphicon-trash'}
                onClick={() => { callback(this.props.id); } }>
            </a>
        );
    }
}

TableDelete.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string
};