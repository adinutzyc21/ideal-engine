import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class DataDelete extends Component {
    /**
     * Delete a column from the Items collection:
     * Go through all the items and delete the column based on ID (to avoid security error)
     * @param column is the name of the column we're deleting
     */
    deleteColumn(column) {
        Meteor.call('items.removeColumn', column);
    }

    /**
     * Delete a row from the Items collection, given its id
     * @param id the id of the column
     */
    deleteRow(id) {
        Meteor.call('items.removeRow', id);
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        // set the color of the button based on the prop given
        var colors = {
            white: 'btn btn-sm btn-default',
            blue: 'btn btn-sm btn-primary',
            green: 'btn btn-sm btn-success',
            cyan: 'btn btn-sm btn-info',
            orange: 'btn btn-sm btn-warning',
            red: 'btn btn-sm btn-danger'
        };
        var btnClass = colors.orange; // default orange
        if (this.props.color) { // whatever color was passed in the props
            btnClass = colors[this.props.color];
        }

        // set the callback depending on the type of delete (row/col)
        var callback = this.deleteRow; //row
        if (this.props.level === 'col') { //column
            callback = this.deleteColumn;
        }

        // display the button
        return (
            <button type='button'
                className={btnClass}
                data-toggle='tooltip' data-placement='right' title={this.props.tooltip}
                onClick={() => { callback(this.props.params); } }>
                <i className='glyphicon glyphicon-trash' />
                {this.props.name}
            </button>
        );
    }
}
/**
  * level: column/row
  * name: string
  * tooltip: string 
  * params: parameters to callback function
  * color: color of the button
  */
DataDelete.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string,
    params: PropTypes.any.isRequired,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};