import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Cell extends Component {
  populateCells
  render() {
    return (
      <li>{this.props.cell.text}</li>
    );
  }
}
 
Cell.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  cell: PropTypes.object.isRequired,
};
