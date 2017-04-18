import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

// import Dropzone from 'react-dropzone';
// import request from 'superagent/lib/client';
import Papa from 'papaparse';

export default class LoadCSV extends Component {
  /**
  * Initialize state variables and bind 'this' to methods
  */
  constructor(props) {
    super(props);
    // this.loadCSV = this.loadCSV.bind(this);
    this.parseCSV = this.parseCSV.bind(this);
  }

  parseCSV(filename) {
    const self = this;
    Papa.parse(filename, {
      header: true,
      download: true,
      keepEmptyRows: false,
      skipEmptyLines: true,
      complete(result) {
        const data = result.data;
        const columns = result.meta.fields;

        // insert this into the meteor table
        Meteor.call('comparison.importCSV', self.props.tableId, data, columns);
      },
    });
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // TODO: move this to private and use Assets
    const filename = '/output.csv';
    // display the button
    return (
      <a role='button' onClick={() => this.parseCSV(filename)}>Load CSV</a>
    );
  }
}
LoadCSV.propTypes = {
  tableId: PropTypes.string,
};