import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import TableDisplay from './TableDisplay.jsx';
import DataInsert from './DataInsert.jsx';

import { Items } from '../api/items.js'

import { Meteor } from 'meteor/meteor';
import MenuBar from './MenuBar.jsx';

// App component - represents the whole app
class App extends Component {
    /**
     * Extract the column names from the information available in the database: 
     * this is the union of all properties of each row object in the database
     * E.g: 
     * Input: [{"Item": "Apt 1","Price": "$725"},
     *         {"Item": "Apt 2", "Surface": "500 sq. ft."}],
     * Output: ["Item", "Price", "Surface"]
     * @returns the union of all columns
     */
    parseColumns() {
        var cols = [];
        for (var i = 0, len = this.props.rows.length; i < len; i++) {
            var row = this.props.rows[i];
            for (var property in row) {
                // only add non-_id columns that aren't already in the collection
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

        // If the data is empty, show that there is no data available 
        if (this.props.rows.length === 0) {
            return (
                <div className='react-bs-container-body'>
                    <MenuBar cols={this.parseColumns()} rows={this.props.rows} />
                    <table>
                        <tbody>
                            <tr><td>No data available. Use the menu to add data.</td></tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        // Otherwise, show the table
        return (
            <div className='react-bs-container-body'>
                <MenuBar cols={this.parseColumns()} rows={this.props.rows} />
                <TableDisplay cols={this.parseColumns()} rows={this.props.rows} />
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(({ params }) => {
    const subscription = Meteor.subscribe('items');
    const loading = !subscription.ready();
    const rows = Items.find().fetch();

    return {
        loading, rows,
        currentUser: Meteor.user(),
    };
}, App);

