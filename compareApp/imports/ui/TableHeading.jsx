import React, { Component, PropTypes } from 'react';

import DataDelete from './DataDelete.jsx';
import DataInsert from './DataInsert.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {
  /**
     * Extract the option names from the information available in the database: 
     * this is the union of all properties of each row object in the database
     * E.g: 
     * Input: [{"Item": "Chase","Age": "27"},
     *         {"Item": "Joe", "Height": "5'7"'}],
     * Output: ["Chase", "Joe"]
     * @returns all the items in the database
     */
    parseItems(list) {
        var items = [];
        for (var i = 0, len = list.length; i < len; i++) {
          items.push({
            id: list[i]._id,
            item: list[i].Item});
        }
        return items;
    }

  renderHeadings() {
    var self=this;
    var items = this.parseItems(self.props.rows);
    return this.props.cols.map(function (col, idx, array) {
      var html = [];
      // allow column deletion for all columns except "Item" column
      if (col !== "Item") {
        html.push(
          <span key={col} className="del-col">
            <DataDelete level='col' color='red' tooltip='Delete a column' callback={this.deleteColumn} params={col} />
          </span>);

      }
      // allow column addition by adding a ButtonDelete after the last column
      if (idx === array.length - 1) {
        html.push(
          <span  key={col+"2"} className="add-col">
            <DataInsert level="col" data={items} color="blue" tooltip="Add a column"/>
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