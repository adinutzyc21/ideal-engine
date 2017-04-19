import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

/**
 * DataDelete component - delete button (added next to the row headers or
 * column headers) to delete options (rows) or criteria (columns)
 */
export default class DataDelete extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // make 'this' available in these methods
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
  }

  /**
   * Enable highlight when the mouse hovers over the 'x'
   */
  handleMouseIn() {
    $('.' + this.props.params).addClass('del-highlight');
  }

  /**
   * Disable highlight when the mouse leaves the 'x'
   */
  handleMouseOut() {
    $('.' + this.props.params).removeClass('del-highlight');
  }

  /**
   * Delete a column from Mongo given its id
   * @param id the id of the column we're deleting
   */
  deleteColumn(id) {
    Meteor.call('comparison.deleteColumn', id);
  }

  /**
   * Delete a row from Mongo given its id
   * @param id the id of the column
   */
  deleteRow(id) {
    Meteor.call('comparison.deleteRow', id);
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // set the callback depending on the type of delete (row/col)
    let callback = this.deleteRow; // row
    let title = 'Delete Row';
    if (this.props.level === 'col') { // column
      callback = this.deleteColumn;
      title = 'Delete Column';
    }

    // display the button
    return (
      <a role='button' data-toggle='tooltip' title={title}
        className={'glyphicon glyphicon-remove del-button'}
        onClick={() => { callback(this.props.params); }}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut} >
      </a>
    );
  }
}
/**
  * level: column/row
  * params: parameters to callback function
  */
DataDelete.propTypes = {
  level: PropTypes.oneOf(['row', 'col']).isRequired,
  params: PropTypes.string.isRequired,
};
