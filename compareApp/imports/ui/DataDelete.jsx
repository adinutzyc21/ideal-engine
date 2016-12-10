import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class DataDelete extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            color: "",
            title: "",
        };
    }

    /**
     * Set state variables that depend on level
     */
    componentDidMount() {
        // set the color of the button based on level
        // set the color / title
        if (this.props.level === "col") {
            this.setState({
                color: 'orange',
                title: 'Delete Criterion'
            });
        }
        else {
            this.setState({
                color: 'red',
                title: 'Delete Option'
            });
        }
    }
    /**
     * Delete a column from the Comparison collection given its name
     * @param column is the name of the column we're deleting
     */
    deleteColumn(column) {
        Meteor.call('comparison.removeColumn', column);
    }

    /**
     * Delete a row from the Comparison collection, given its id
     * @param id the id of the column
     */
    deleteRow(id) {
        Meteor.call('comparison.removeRow', id);
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        // set the callback depending on the type of delete (row/col)
        var callback = this.deleteRow; //row
        if (this.props.level === 'col') { //column
            callback = this.deleteColumn;
        }

        // display the button
        return (
            <a role="button" data-toggle="tooltip" title={this.state.title}
            className={'glyphicon glyphicon-remove delbutton '+this.state.color}
                onClick={() => { callback(this.props.params); } }></a>
        );
    }
}
/**
  * level: column/row
  * params: parameters to callback function
  */
DataDelete.propTypes = {
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    params: PropTypes.any.isRequired
};