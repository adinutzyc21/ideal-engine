import React, { Component, PropTypes } from 'react';

// DataRow component - displays the header of the table
export default class DataRow extends Component {
  renderRows() {
    var self = this;
    return this.props.rows.map(function (row) {
      return React.DOM.tr({ key: row._id.valueOf() },
        self.props.cols.map(function (col) {
          var data = row[col];
          if (!data) data = "";
          else data = data.toString();
          return React.DOM.td({ key: col }, data);
        }));
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