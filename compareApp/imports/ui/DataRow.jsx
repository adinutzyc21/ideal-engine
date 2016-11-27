import React, { Component, PropTypes } from 'react';

// DataRow component - displays the header of the table
export default class DataRow extends Component {
  renderRow() {
    var row = this.props.rows[0];
    return this.props.cols.map((column) => (
      <td key={column}>{row.text}</td>
    ));
  }

  render() {
    return (
      <tbody>
        <tr>
          {this.renderRow()}
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