import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import TableDisplay from './TableDisplay.jsx';

import { Items } from '../api/dataItems.js'

import Button from './Button.jsx';

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
        // If the array is empty, show a spinner
        if (this.props.rows.length === 0) {
            return (
                <div className='container'>
                    <header>
                        <h1>CompareApp Draft</h1>
                    </header>

                    <br />

                    <div className='react-bs-container-body'>
                        No data available. <br/>
                        <Button type='add' level='row' name='Add a row' color='cyan' tooltip='Add a row' callback={this.addRow} />
                    </div>
                </div>
            );
            // return <div>No data</div>;
        }

        return (
            <div className='container'>
                <header>
                    <h1>CompareApp Draft</h1>
                </header>

                <TableDisplay cols={this.parseColumns()} rows={this.props.rows} />
            </div>

        );
    }
}

App.propTypes = {
    rows: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        rows: Items.find({}).fetch()
    };
}, App);

