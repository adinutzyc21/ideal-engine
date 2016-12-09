import React, { Component, PropTypes } from 'react';

import DataDelete from './DataDelete.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {

  renderHeadings() {
    return this.props.cols.map(function (col, idx, array) {
      var html = [];
      // allow column deletion for all columns except "Item" column
      if (col !== "Item") {
        html.push(
          <span key={col} className="del-col">
            <DataDelete level='col' color='red' tooltip='Delete a column' 
            callback={this.deleteColumn} params={col} />
          </span>);

      }
      // add the data to display
      html.push(col);

      // return a heading with column names and ButtonDeletes
      return <th key={col}>{html}</th>
    });
  }

  render() {
    return (
      <thead>
        <tr className="criteriaHeading">
          {this.renderHeadings()}
        </tr>
      </thead>
    );
  }
}

CriteriaHeading.propTypes = {
  // This component gets the items to display through a React prop.
  cols: PropTypes.array.isRequired,
};