import React, { Component, PropTypes } from 'react';
import { Items } from '../api/items.js';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class ButtonDelete extends Component {
    deleteColumn(params) {
        var rows = params.data;
        var col = params.col.valueOf();
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            Items.update(row._id, {
                $unset: {
                    [col]: ""
                }
            });
        }
    }

    deleteRow(id) {
        Items.remove(id);
    }

    render() {
        var btnClass = '';
        var callback = null;
        var colors = {
            white: 'btn btn-sm btn-default',
            blue: 'btn btn-sm btn-primary',
            green: 'btn btn-sm btn-success',
            cyan: 'btn btn-sm btn-info',
            orange: 'btn btn-sm btn-warning',
            red: 'btn btn-sm btn-danger'
        };

        if (!this.props.color)
            btnClass = colors.orange;
        else
            btnClass = colors[this.props.color];

        if (this.props.level === 'row') {
            callback = this.deleteRow;
        }
        else if (this.props.level === 'col') {
            callback = this.deleteColumn;
        }

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
  * params: parameters to callback function, can be undefined
  * color: color of the button
  */
ButtonDelete.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string,
    params: PropTypes.any.isRequired,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};