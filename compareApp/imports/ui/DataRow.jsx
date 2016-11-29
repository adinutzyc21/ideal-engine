import React, { Component, PropTypes } from 'react';

import Button from './Button.jsx';

// DataRow component - displays the cotents of the table
export default class DataRow extends Component {

  renderRow(row) {

    console.log("id "+row._id);
    // for each column
    return this.props.cols.map(function (col) {
      // if the column exists in the current row
      if (row[col]) {
        // if it's the first column, then also display it as a header and show the delete button
        if (col == "Item") {
          return (
            <td key={col} className="secondary-heading">
              <span className="del-row">
                <Button type='del' level='row' color='orange' tooltip='Delete a row' callback={this.deleteRow} params={row._id} />
              </span>
              {row[col].valueOf()}
            </td>
          );
        }
        // display only the values for all columns
        return (
          <td key={col}>{row[col].valueOf()}</td>
        );
      }
      // empty column if the value isn't defined'
      return <td key={col}></td>;
    })
  }

  renderRows() {
    var self = this;
    return this.props.rows.map(function (row, idx, array) {
      if (idx === array.length - 1)
        isLast = true;
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