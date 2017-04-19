import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import DataDelete from '../menu/DataDelete.jsx'; // eslint-disable-line no-unused-vars

// DataRow component - displays the cotents of the table
export default class DataRow extends Component {

  renderRow(row) {
    // for each column
    return this.props.cols.map((col, idx) => {
      const html = [];
      let classN = '';

      // if the current column is populated
      if (row[col._id]) {
        // display the first column as a header and show the delete button to the left
        if (idx === 0) {
          classN = 'secondary-heading div-delete';
          html.push(
            <DataDelete key='del' level='row' params={row._id} />);
          html.push(<span key='score-display' className='score-display'>{row.score}</span>);

        // display the next columns
        } else {
          html.push(<span key='score-display' className='score-display'>
                    {row[col._id].score}</span>);
        }
        // add the data to display
        html.push(<span key='name-display'>{row[col._id].value}</span>);
      }
      // return a row with data and buttons
      return <td key={col._id} className={classN + ' ' + row._id + ' ' + col._id}>{html}</td>;
    });
  }

  renderRows() {
    const self = this;
    return this.props.rows.map(row => (
        <tr key={row._id}>
          {self.renderRow(row)}
        </tr>
      ));
  }

  render() {
    return (
      <tbody>
        {this.renderRows()}
      </tbody>
    );
  }
}

DataRow.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};
