import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

// import Dropzone from 'react-dropzone';
// import request from 'superagent/lib/client';
import Papa from 'papaparse';

export default class LoadCSV extends Component {
     /**
     * Initialize state variables and bind "this" to methods
     */
    constructor(props) {
        super(props);
        // this.loadCSV = this.loadCSV.bind(this);
        this.parseCSV = this.parseCSV.bind(this);
    }

    parseCSV(csv){
        var self = this;
        Papa.parse("/output.csv", {
            header: true,
            download: true,
            keepEmptyRows:false,
            skipEmptyLines: true,
            complete: function(result) {
                var data = result.data;
                var columns = result.meta['fields'];
                
                // insert this into the meteor table
                Meteor.call("comparison.importCSV", self.props.tableId, data, columns);
            }
        });
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {
        //TODO: move this to private and use Assets 
        var filename = '/output.csv';
        var tablename = 'Imported Data Table';
        var description = 'This is the table I\'m making by importing the CSV file'; 
        // display the button
        return (
            <a role="button" onClick={() => this.parseCSV(filename)}>Load CSV</a>
        )
    }
}
LoadCSV.propTypes = {
    tableId: PropTypes.string
};