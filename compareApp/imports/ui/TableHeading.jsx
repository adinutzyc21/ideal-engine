import React, { Component, PropTypes } from 'react';

import ButtonDelete from './ButtonDelete.jsx';
import FormModal from './FormModal.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {
  renderHeadings() {
    var self = this;
    return this.props.cols.map(function (col, idx, array) {
      var html = [];
      // allow column deletion for all columns except "Item" column
      if (col !== "Item") {
        html.push(
          <span key={col} className="del-col">
            <ButtonDelete level='col' color='red' tooltip='Delete a column' callback={this.deleteColumn} 
            params={{
              "col": col,
              "data": self.props.rows
              }} />
          </span>);

      }
      // allow column addition by adding a ButtonDelete after the last column
      if (idx === array.length - 1) {
        html.push(
          <span  key={col+"2"} className="add-col">
            <FormModal level="col" data={self.props.rows} color="blue" tooltip="Add a column"/>
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
  rows: PropTypes.array.isRequired,
};