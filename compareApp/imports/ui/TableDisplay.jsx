import React, { Component, PropTypes } from 'react';

import CriteriaHeading from './CriteriaHeading.jsx';
import DataRow from './DataRow.jsx';
import Button from './Button.jsx';

// Column component - represents columns in the table
export default class TableDisplay extends Component {
  render() {
    //console.log("table "+this.props.rows+"\n"+this.props.cols)
    return (
      <div className='table-container'>
        <table>
          {/* Need a header of type CriteriaHeading */}
          <CriteriaHeading cols={this.props.cols} rows={this.props.rows} />
          {/* Need a bunch of rows of type  DataRow*/}
          <DataRow rows={this.props.rows} cols={this.props.cols} />
        </table>

        <span className="add-row">
          <Button type='add' level='row' color='cyan' tooltip='Add a row' callback={this.addRow} />
        </span>
      </div>
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