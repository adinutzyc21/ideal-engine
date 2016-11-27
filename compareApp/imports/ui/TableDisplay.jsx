import React, { Component, PropTypes } from 'react';

import CriteriaHeading from './CriteriaHeading.jsx';
import DataRow from './DataRow.jsx';

// Column component - represents columns in the table
export default class TableDisplay extends Component {
  render() {
    //console.log("table "+this.props.rows+"\n"+this.props.cols)
    return (
      <table className='table table-bordered'>
        {/* Need a header of type CriteriaHeading */}
        <CriteriaHeading cols={this.props.cols} />
        {/* Need a bunch of rows of type  DataRow*/}
        <DataRow rows={this.props.rows} cols={this.props.cols} />
      </table>
  
    );
  }
}

/**
  * items: items
  */
TableDisplay.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};