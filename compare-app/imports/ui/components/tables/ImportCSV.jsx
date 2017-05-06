import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import Papa from 'papaparse';

export default class ImportCSV extends Component {
  /**
  * Initialize state variables and bind 'this' to methods
  */
  constructor(props) {
    super(props);
    this.parseCSV = this.parseCSV.bind(this);
  }

  parseCSV(filename, isDisabled) {
    if (!isDisabled) {
      const self = this;
      Papa.parse(filename, {
        header: false,
        download: true,
        keepEmptyRows: false,
        skipEmptyLines: true,
        complete(result) {
          const data = result.data;

          // insert this into the meteor table
          Meteor.call('importCSV', self.props.tableId, data);
        },
      });
    }
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // TODO: move this to private and use Assets
    const filename = '/files/output.csv';
    // display the button
    return (
      <a role='button' onClick={() => this.parseCSV(filename, this.props.isDisabled)}>Import CSV</a>
    );
  }
}

// TODO: documentation
ImportCSV.propTypes = {
  tableId: PropTypes.string,
  isDisabled: PropTypes.bool,
};
