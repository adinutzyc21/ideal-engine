import React, { Component, PropTypes } from 'react';

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

    deleteColumn() {
        console.log('delete col');
    }

    deleteRow() {
        console.log('delete row');
    }

    render() {
        var btnClass = '';
        var icon = '';
        var callback = null;
        if (this.props.type === 'add') {
            btnClass = 'btn btn-info btn-sm';
            icon = 'glyphicon glyphicon-plus';
            if(this.props.level === 'row'){
                callback=this.addRow;
            }
            else if(this.props.level === 'col'){
                callback=this.addColumn;
            }
        }
        else if (this.props.type === 'del') {
            btnClass = 'btn btn-warning btn-sm';
            icon = 'glyphicon glyphicon-trash';
            if(this.props.level === 'row'){
                callback=this.deleteRow;
            }
            else if(this.props.level === 'col'){
                callback=this.deleteColumn;
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
  */
Button.propTypes = {
    type: React.PropTypes.oneOf(['add', 'del']).isRequired,
    level: React.PropTypes.oneOf(['row', 'col']).isRequired,
    name: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired,
    params: React.PropTypes.any
};