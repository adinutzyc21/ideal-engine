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
        {/* Display the menu options - this will get better
        <Button type='add' level='row' name='' tooltip='Add a row' params={data} />
        <Button type='add' level='col' name='' tooltip='Add a column' callback={this.addColumn} params={data} />
        <br />
        <Button type='del' level='row' name='' tooltip='Delete a row' callback={this.deleteRow} />
        <Button type='del' level='col' name='' tooltip='Delete a column' callback={this.deleteColumn} />
            */}
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
    type:       PropTypes.oneOf(['add', 'del']).isRequired,
    level:      PropTypes.oneOf(['row', 'col']).isRequired,
    name:       PropTypes.string,
    tooltip:    PropTypes.string.isRequired,
    params:     PropTypes.any
};