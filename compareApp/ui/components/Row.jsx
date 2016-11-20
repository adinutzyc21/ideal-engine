import React, { Component, PropTypes } from 'react';

// Column component - represents columns in the table
export default class Row extends Component {
  render() {
    console.log(this.props.row);
    var object = this.props.row;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        // do stuff
        console.log(property);
      }
    }
    debugger;
    return (
      <tr>
        <td>t1</td>
        <td>t1</td>
        <td>t1</td>
      </tr>
    );
  }
}

Row.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  Row: PropTypes.object.isRequired,
};