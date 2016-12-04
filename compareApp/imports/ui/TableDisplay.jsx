import React, { Component, PropTypes } from 'react';

import TableHeading from './TableHeading.jsx';
import TableRow from './TableRow.jsx';
import FormModal from './FormModal.jsx';

// Column component - represents columns in the table
export default class TableDisplay extends Component {
  render() {
    return (
      <div className='table-container'>
        <table>
          {/* Need a header of type TableHeading */}
          <TableHeading cols={this.props.cols} rows={this.props.rows} />
          {/* Need a bunch of rows of type  TableRow*/}
          <TableRow rows={this.props.rows} cols={this.props.cols} />
        </table>

        <span className="add-row">
          <FormModal level="row" data={this.props.cols} color="cyan" tooltip="Add a row"/>
        </span>
      </div>
    );
  }
}

/**
  * items: items
  */
TableDisplay.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};