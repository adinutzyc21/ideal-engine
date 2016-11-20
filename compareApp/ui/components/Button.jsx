import React, { Component, PropTypes } from 'react';

// Button component - use to add a button
export default class Button extends Component {

    render() {
        var btnClass = '';
        var icon = '';
        if (this.props.type === 'add') {
            btnClass = 'btn btn-info btn-sm';
            icon = 'glyphicon glyphicon-plus';
        }
        else if (this.props.type === 'del') {
            btnClass = 'btn btn-warning btn-sm';
            icon = 'glyphicon glyphicon-trash';
        }
        if (this.props.params === undefined || this.props.params === null) {
            return (
                <button type='button'
                    className={btnClass}
                    data-toggle='tooltip' data-placement='right' title={this.props.tooltip}
                    onClick={this.props.callback}>
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
                    onClick={() => { this.props.callback(this.props.params); } }>
                    <i className={icon} />
                    {this.props.name}
                </button>
            );
        }
    }
}
/**
  * type: string add/remove
  * name: string
  * tooltip: string 
  * callback: function
  * params: parameters to callback function, can be undefined
  */
Button.propTypes = {
    type: React.PropTypes.oneOf(['add', 'del']),
    name: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired,
    callback: React.PropTypes.any.isRequired,
    params: React.PropTypes.any
};