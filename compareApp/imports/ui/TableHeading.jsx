import React, { Component, PropTypes } from 'react';

import DataDelete from './DataDelete.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {

  renderHeadings() {
    return this.props.cols.map(function (col, idx, array) {
      var html = [];
      var classN = "";
      // allow column deletion for all columns except "Option" column
      if (col !== "Option") {
        classN = "divdelete";
        html.push(
          <DataDelete key="del" level='col'  params={col} />
        );
      }
      // add the data to display
      html.push(col);

      // return a heading with column names and ButtonDeletes
      return <th key={col} className={classN}>{html}</th>
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
  cols: PropTypes.array.isRequired,
};