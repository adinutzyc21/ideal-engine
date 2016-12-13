import React, { Component, PropTypes } from 'react';

import DataDelete from './DataDelete.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {

  renderHeadings() {
    return this.props.cols.map(function (col, idx) {
      var html = [];
      var classN = "";
      // allow column deletion for all columns except "Option" column
      if (idx !== 0) {
        classN = "divdelete";
        html.push(
          <DataDelete key="del" level='col' params={col._id} />
        );
        html.push(col.name);
      }
      // add the data to display
      else {
        html.push("Option Name");
      }

      // return a heading with column names and ButtonDeletes
      return <th key={col._id} className={classN + " " + col._id}>{html}</th>
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