import React, { Component, PropTypes } from 'react';

import Button from './Button.jsx';
 
// CriteriaHeading component - displays the header of the table
export default class CriteriaHeading extends Component {
  renderHeadings() {
    return this.props.cols.map((heading) => (
      <th key={heading}>{heading}</th>
    ));
  }
  render() {
    return (
      <thead>
        <tr>
          {this.renderHeadings()}
          <th key="addCol"><Button type='add' level='col' name='' tooltip='Add a column' callback={this.addColumn}/></th>
        </tr>
      </thead>
    );
  }
}
 
CriteriaHeading.propTypes = {
  // This component gets the items to display through a React prop.
  cols: PropTypes.array.isRequired,
};