import React, { Component, PropTypes } from 'react';

import DataDelete from './DataDelete.jsx';

// DataRow component - displays the cotents of the table
export default class DataRow extends Component {

  renderRow(row) {
    // for each column
    return this.props.cols.map(function (col) {
      var html = [];

      // if the current column is populated
      if (row[col]) {
        var classN = "";
        // display the first column as a header and show the delete button to the left
        if (col === "option") {
          classN = "secondary-heading divdelete";
          html.push(
              <DataDelete key="del" level='row' params={row._id} />
          );
        }
        // add the data to display
        html.push(<span key="name-display">{row[col].value.valueOf()}</span>);
        html.push(<span key="score-display" className="score-display">{row[col].score.valueOf()}</span>);
      }
      // return a row with data and buttons
      return <td key={col} className={classN+" "+row._id+" "+col}>{html}</td>;
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