import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import TableDisplay from './TableDisplay.jsx';
import DataInsert from './DataInsert.jsx';

import { Option, Criterion } from '../api/comparison.js'

import { Meteor } from 'meteor/meteor';
import MenuBar from './MenuBar.jsx';

// App component - represents the whole app
class App extends Component {
    /**
     * Extract the column names from the information available in the database: 
     * this is the union of all properties of each row object in the database
     * E.g: 
     * Input: [{"Option": "Apt 1","Price": "$725"},
     *         {"Option": "Apt 2", "Surface": "500 sq. ft."}],
     * Output: ["Option", "Price", "Surface"]
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
        var year = new Date().getFullYear() + " ";
        if (year > 2016) year = "2016 -" + year + " ";
        console.log(this.parseColumns());
        console.log(this.props.cols);

        // Show the app
        return (
            <div className='react-bs-container-body'>
                <MenuBar cols={this.parseColumns()} rows={this.props.rows} loading={this.props.loading} />
                <TableDisplay cols={this.parseColumns()} rows={this.props.rows} loading={this.props.loading} />
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container" className="pager">
                        Copyright &#169; {year}Adina Stoica. All rights reserved.
                </div>
                </nav>
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    cols: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(({ params }) => {
    const subscriptionR = Meteor.subscribe('option');
    const loadingR = !subscriptionR.ready();
    const rows = Option.find().fetch();

    const subscriptionC = Meteor.subscribe('criterion');
    const loadingC = !subscriptionC.ready();
    const cols = Criterion.find().fetch();

    const loading = loadingR && loadingC;

    return {
        loading, rows, cols,
        currentUser: Meteor.user(),
    };
}, App);

