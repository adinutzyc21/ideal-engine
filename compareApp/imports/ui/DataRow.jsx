import React, { Component, PropTypes } from 'react';

import Button from './Button.jsx';

// DataRow component - displays the header of the table
export default class DataRow extends Component {

  renderRow(row) {
    return this.props.cols.map(function (col) {
      if (row[col]) {
        if (col == "Item")
          return (
            <th key={col}>{row[col].valueOf()}</th>
          );
        return (
          <td key={col}>{row[col].valueOf()}</td>
        );
      }
      return <td key={col}></td>;
    })
  }

  renderRows() {
    var self = this;
    return this.props.rows.map(function (row) {
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
        <tr>
          <td key="addRow"><Button type='add' level='row' name='' tooltip='Add a row' callback={this.addRow} /></td>
        </tr>
      </tbody>
    );
  }
}

DataRow.propTypes = {
  // This component gets the items to display through a React prop.
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};