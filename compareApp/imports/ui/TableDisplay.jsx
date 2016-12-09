import React, { Component, PropTypes } from 'react';

import TableHeading from './TableHeading.jsx';
import TableRow from './TableRow.jsx';

// Column component - represents columns in the table
export default class TableDisplay extends Component {
  render() {
    // otherwise render data
    return (
      <div className='table-container'>
        <table>
          {/* Need a header of type TableHeading */}
          <TableHeading cols={this.props.cols} />
          {/* Need a bunch of rows of type  TableRow*/}
          <TableRow rows={this.props.rows} cols={this.props.cols} />
        </table>
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