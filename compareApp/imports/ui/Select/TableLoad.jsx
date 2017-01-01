import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import TableDisplay from '../Display/TableDisplay.jsx';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class TableLoad extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // make this available in these methods
        this.loadTable = this.loadTable.bind(this);
    }

    loadTable() {
        ReactDOM.render(<TableDisplay tableId={this.props.id}/>,document.getElementById('app-container'));        
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        // set the callback depending on the type of delete (row/col)
        var title = 'Load Table ';
        if (this.props.name !== undefined) {
            title += this.props.name;
        }

        // display the button
        return (
            <a role="button" data-toggle="tooltip" title={title}
                className={"btn btn-success glyphicon glyphicon-ok"}
                onClick={this.loadTable} >
            </a>
        );
    }
}

TableLoad.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string
};