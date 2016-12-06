import React, { Component, PropTypes } from 'react';

import { Button } from 'react-bootstrap';

// ButtonAdd component - use to add a button
export default class ButtonAdd extends Component {

    render() {
        var btnClass = '';
        var icon = '';
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
            btnClass = colors.cyan;
        else
            btnClass = colors[this.props.color];

        if (this.props.level === 'row') {
            callback = this.addRow;
        }
        else if (this.props.level === 'col') {
            callback = this.addColumn;
        }

        if (this.props.params === undefined || this.props.params === null) {
            return (
                <button type='submit'
                    className={btnClass}
                    data-toggle='tooltip' data-placement='right' title={this.props.tooltip}
                    onClick={callback}>
                    <i className='glyphicon glyphicon-plus' />
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
ButtonAdd.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};