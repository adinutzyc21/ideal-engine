import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Spinner from 'react-spinkit';

import TableDisplay from './TableDisplay.jsx';
import { Items } from '../api/dataItems.js'

// App component - represents the whole app
class App extends Component {
    /*
    {
    cols: ["Name", "Age"],
    rows: [{
        "Name": "Chase",
        "Age": "27"
    }],
    */
    parseColumns(data) {
        var cols = [];
        for (var i = 0, len = data.length; i < len; i++) {
            var row = data[i];
            for (var property in row) {
                if (property!="_id" && row.hasOwnProperty(property) && !cols.includes(property)) {
                    cols.push(property);
                }
            }
        }
        return cols;
    }

    render() {
        if (!this.props.rows) {
            // Render a spinner or something...
            return (
                <div className='container'>
                    <header>
                        <h1>CompareApp Draft</h1>
                    </header>

                    <br />

                    <div className='react-bs-container-body'>
                        <Spinner spinnerName='three-bounce' />
                    </div>
                </div>
            );
        }

        // Gives you the opportunity to handle the case where the request
        // completed but the result array is empty
        if (this.props.rows.length === 0) {
            return (
                <div className='container'>
                    <header>
                        <h1>CompareApp Draft</h1>
                    </header>

                    <br />

                    <div className='react-bs-container-body'>
                        <Spinner spinnerName='three-bounce' />
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

                <br />
                <div className='react-bs-container-body'>
                    <TableDisplay cols={this.parseColumns(this.props.rows)} rows={this.props.rows}/>
                </div>
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

