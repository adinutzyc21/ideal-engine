import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import TableDisplay from './TableDisplay.jsx';
import FormModal from './FormModal.jsx';

import { Items } from '../api/items.js'

// App component - represents the whole app
class App extends Component {
    /**
     * Extract the column names from the information available in the database: 
     * this is the union of all properties of each row object in the database
     * E.g: 
     * Input: [{"Name": "Chase","Age": "27"},
     *         {"Name": "Joe", "Height": "5'7"'}],
     * Output: ["Name", "Age", "Height"]
     * @returns the union of all columns
     */
    parseColumns() {
        var cols = [];
        for (var i = 0, len = this.props.rows.length; i < len; i++) {
            var row = this.props.rows[i];
            for (var property in row) {
                if (property != "_id" && row.hasOwnProperty(property) && !cols.includes(property)) {
                    cols.push(property);
                }
            }
        }
        return cols;
    }

    /**
     * Render the data
     */
    render() {
        // <ButtonAdd level='row' name='Add a row' color='cyan' tooltip='Add a row' callback={this.addRow} />
        // While the data is loading, show a spinner
        if (this.props.loading) {
            return <Spinner spinnerName='three-bounce' />;
        }

        // If the data is empty, show that there is no data available and allow row addition
        if (this.props.rows.length === 0) {
            return (
                <div className='react-bs-container-body'>
                    No data available. <br />
                    <FormModal level="row" data={this.parseColumns()} color="cyan" tooltip="Add a row"/>
                </div>

            );
        }

        // Otherwise, show the table
        return (
            <div className='react-bs-container-body'>
                <TableDisplay cols={this.parseColumns()} rows={this.props.rows} />
            </div>

        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired
};

export default createContainer(({ params }) => {
    const subscription = Meteor.subscribe('items');
    const loading = !subscription.ready();
    const rows = Items.find().fetch();

    return { loading, rows };
}, App);

