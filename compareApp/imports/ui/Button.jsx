import React, { Component, PropTypes } from 'react';
import { Items } from '../api/dataItems.js'

// Button component - use to add a button
export default class Button extends Component {

    addColumn(cols) {
        console.log('add col');
        console.log(cols);
    }

    addRow(row) {
        console.log('add row');
        console.log(row);
    }

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
        console.log('delete row ' + id);
        Items.remove(id);
    }

    getColors() {
        return {
            white: 'btn btn-sm btn-default',
            blue: 'btn btn-sm btn-primary',
            green: 'btn btn-sm btn-success',
            cyan: 'btn btn-sm btn-info',
            orange: 'btn btn-sm btn-warning',
            red: 'btn btn-sm btn-danger'
        };
    }

    render() {
        var btnClass = '';
        var icon = '';
        var callback = null;
        var colors = this.getColors();
        if (this.props.type === 'add') {
            if (!this.props.color)
                btnClass = colors.cyan;
            else
                btnClass = colors[this.props.color];
            icon = 'glyphicon glyphicon-plus';
            if (this.props.level === 'row') {
                callback = this.addRow;
            }
            else if (this.props.level === 'col') {
                callback = this.addColumn;
            }
        }
        else if (this.props.type === 'del') {
            if (!this.props.color)
                btnClass = colors.orange;
            else
                btnClass = colors[this.props.color];
            icon = 'glyphicon glyphicon-trash';
            if (this.props.level === 'row') {
                callback = this.deleteRow;
            }
            else if (this.props.level === 'col') {
                callback = this.deleteColumn;
            }
        }

        if (this.props.params === undefined || this.props.params === null) {
            return (
                <button type='button'
                    className={btnClass}
                    data-toggle='tooltip' data-placement='right' title={this.props.tooltip}
                    onClick={callback}>
                    <i className={icon} />
                    {this.props.name}
                </button>
            );
        }
        else {
            return (
                <button type='button'
                    className={btnClass}
                    data-toggle='tooltip' data-placement='right' title={this.props.tooltip}
                    onClick={() => { callback(this.props.params); } }>
                    <i className={icon} />
                    {this.props.name}
                </button>
            );
        }
    }
}
/**
  * type: string add/remove
  * level: column/row
  * name: string
  * tooltip: string 
  * params: parameters to callback function, can be undefined
  * color: color of the button
  */
Button.propTypes = {
    type: PropTypes.oneOf(['add', 'del']).isRequired,
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string.isRequired,
    params: PropTypes.any,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};