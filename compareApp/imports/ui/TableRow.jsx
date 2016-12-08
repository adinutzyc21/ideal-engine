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
        if (col === "Item") {
          classN = "secondary-heading";
          html.push(
            <span key={col} className="del-row">
              <DataDelete level='row' color='orange' tooltip='Delete a row' callback={this.deleteRow} params={row._id} />
            </span>
          );
        }
        // add the data to display
        html.push(row[col].valueOf());
      }
      // return a row with data and buttons
      return <td key={col} className={classN}>{html}</td>;
    })
  }

  renderRows() {
    var self = this;
    return this.props.rows.map(function (row, idx, array) {
      return (
        <tr key={row._id.valueOf()}>
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
  // This component gets the items to display through a React prop.
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};