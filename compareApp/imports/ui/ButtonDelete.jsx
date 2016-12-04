import React, { Component, PropTypes } from 'react';
import { Items } from '../api/items.js';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class ButtonDelete extends Component {
    /**
     * Delete a column from the Items collection:
     * Go through all the items and delete the column based on ID (to avoid security error)
     * @param params {rows, col} where 
     *      params.rows is the data in the table and 
     *      params.col is the name of the column we're deleting
     */
    deleteColumn(params) {
        var rows = params.data;
        var col = params.col;
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            Items.update(row._id, {
                $unset: { [col]: "" }
            });
        }
    }

    /**
     * Delete a row from the Items collection, given its id
     * @param id
     */
    deleteRow(id) {
        Items.remove(id);
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
ButtonDelete.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string,
    params: PropTypes.any.isRequired,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};