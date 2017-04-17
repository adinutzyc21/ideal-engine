import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import DataDelete from '../menu/DataDelete.jsx'; // eslint-disable-line no-unused-vars

/**
 * TableHeading component - displays the header of the table given the data
 */
export default class TableHeading extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
    };
    // make this available in these methods
    this.editScore = this.editScore.bind(this);
    this.editColName = this.editColName.bind(this);
  }

  editScore() {
    console.log('edit score');
  }

  editColName() {
    console.log('edit col name');
  }

  /**
   * Construct the table header html from the cols array
   */
  buildHeaderHtml() {
    return this.props.cols.map((col, idx) => {
      // this is the final html for our heare
      const tableHeaderHtml = [];

      // is this a deletable column (all except first column)
      let deletableCol = '';

      // allow column deletion for all columns except the first ('Option Name') one
      if (idx !== 0) {
        // add the correct class
        deletableCol = 'divdelete';

        // add the data delete option to the html
        tableHeaderHtml.push(
          <DataDelete key='del' level='col' params={col._id} />);

        // add the score to the html
        // TODO: make the score editable
        tableHeaderHtml.push(<span key='score-display' className='score-display'
          onClick={this.editScore}> {col.score} </span>);

        // TODO: add menu for type of column (glyphicon glyphicon-menu-down)
      }
      // add the column name to the html
      // TODO: make the column name editable
      tableHeaderHtml.push(<span key='name-display' onClick={this.editColName}>{col.name}</span>);

      // return a heading with column names and ButtonDeletes
      return <th key={col._id} className={deletableCol + ' ' + col._id}>{tableHeaderHtml}</th>;
    });
  }

  /**
   * Render the table header
   */
  render() {
    return (
      <thead>
        <tr>
          {this.buildHeaderHtml()}
        </tr>
      </thead>
    );
  }
}
/**
 * The properties retrieved in this component:
 * cols {Array} - the data in the Mongo Cols table
 */
TableHeading.propTypes = {
  cols: PropTypes.array.isRequired,
};
