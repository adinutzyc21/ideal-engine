import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import DataDelete from '../menu/DataDelete.jsx'; // eslint-disable-line no-unused-vars

/**
 * TableRow component - displays the contents of the table given the data
 */
export default class DataRow extends Component {
  /**
   * Display one row of data in the correct columns
   * @param {Array} row - a row of data
   */
  renderRow(row) {
    // for each column
    return this.props.cols.map((col, idx) => {
      // this is the final html for our table data
      const tableDataHtml = [];

      // is this a deletable header row (basically the first row)
      let headerDelRow = '';

      // if the current column is populated in the row
      if (row[col._id]) {
        // display the first row as a header and allow deletion
        if (idx === 0) {
          // add the correct class
          headerDelRow = 'secondary-heading div-delete';

          // add the score to the html
          tableDataHtml.push(<span key='score-display' className='score-display'>
            {row.score}</span>);

          // add the data delete option to the html
          tableDataHtml.push(
            <DataDelete key='del' level='row' params={row._id} />);

        // if it's not the first column, no delete button or special formatting
        } else {
          tableDataHtml.push(<span key='score-display' className='score-display'>
                    {row[col._id].score}</span>);
        }
        // add the table data to the html
        tableDataHtml.push(<span key='name-display'>{row[col._id].value}</span>);
      }
      // return a row with data and ButtonDeletes
      return <td key={col._id} className={headerDelRow + ' ' + row._id + ' ' + col._id}>{tableDataHtml}</td>;
    });
  }

  /**
   * Render all of the rows in the table in appropriate tags
   */
  render() {
    const self = this;
    return <tbody>
        {this.props.rows.map(row => (
          <tr key={row._id}>
            {self.renderRow(row)}
          </tr>
        ))}
      </tbody>;
  }
}

DataRow.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};
