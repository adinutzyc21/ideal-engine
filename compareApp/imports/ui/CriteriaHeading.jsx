import React, { Component, PropTypes } from 'react';
import Button from './Button.jsx';

// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {

  renderHeadings() {
    return this.props.cols.map(function (heading, idx, array) {
      if (idx === array.length - 1)
        return (
          <th key={heading}>
            <span className="del-col">
              <Button type='del' level='col' color='red' tooltip='Delete a column' callback={this.deleteColumn} />
            </span>
            <span className="add-col">
              <Button type='add' level='col' color='blue' tooltip='Add a column' callback={this.addColumn} />
            </span>
            {heading}
          </th>
        );
      return (
        <th key={heading}>
          <span className="del-col">
            <Button type='del' level='col' color='red' tooltip='Delete a column' callback={this.deleteColumn} />
          </span>
          {heading}
        </th>
      );
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