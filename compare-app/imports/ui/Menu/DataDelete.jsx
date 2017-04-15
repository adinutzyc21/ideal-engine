import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class DataDelete extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // make this available in these methods
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseIn = this.handleMouseIn.bind(this);
    }

    handleMouseOut() {
        $("." + this.props.params).removeClass("del-highlight");
    }

    handleMouseIn() {
        $("." + this.props.params).addClass("del-highlight");
    }

    /**
     * Delete a column from the Comparison collection given its id
     * @param id the id of the column we're deleting
     */
    deleteColumn(id) {
        Meteor.call('comparison.deleteColumn', id);
    }

    /**
     * Delete a row from the Comparison collection, given its id
     * @param id the id of the column
     */
    deleteRow(id) {
        Meteor.call('comparison.deleteRow', id);
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        // set the callback depending on the type of delete (row/col)
        var callback = this.deleteRow; //row
        var title = 'Delete Option';
        if (this.props.level === 'col') { //column
            callback = this.deleteColumn;
            title = 'Delete Criterion'
        }

        // display the button
        return (
            <a role="button" data-toggle="tooltip" title={title}
                className={'glyphicon glyphicon-remove delbutton'}
                onClick={() => { callback(this.props.params); } }
                onMouseEnter={this.handleMouseIn}
                onMouseLeave={this.handleMouseOut} >
            </a>
        );
    }
}
/**
  * level: column/row
  * params: parameters to callback function
  */
DataDelete.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    params: PropTypes.string.isRequired
};