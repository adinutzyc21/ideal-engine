import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DataDelete from '../Menu/DataDelete.jsx';

// DataRow component - displays the cotents of the table
export default class DataRow extends Component {

  renderRow(row) {
    // for each column
    return this.props.cols.map(function (col, idx) {
      var html = [];

      // if the current column is populated
      if (row[col._id]) {
        var classN = "";
        // display the first column as a header and show the delete button to the left
        if (idx === 0) {
          classN = "secondary-heading divdelete";
          html.push(
            <DataDelete key="del" level='row' params={row._id} />
          );
          html.push(<span key="score-display" className="score-display">{row.score}</span>);
        }
        else {
          html.push(<span key="score-display" className="score-display">{row[col._id].score}</span>);
        }
        // add the data to display
        html.push(<span key="name-display">{row[col._id].value}</span>);
      }
      // return a row with data and buttons
      return <td key={col._id} className={classN + " " + row._id + " " + col._id}>{html}</td>;
    })
  }

  renderRows() {
    var self = this;
    return this.props.rows.map(function (row) {
      return (
        <tr key={row._id}>
          {self.renderRow(row)}
        </tr>
      )
    });
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