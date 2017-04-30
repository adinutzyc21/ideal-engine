import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * FormatColumn component - add a dropdown menu to the right of delete button:
 * this should allow formatting of data in special ways
 */
export default class FormatColumn extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // make 'this' available in these methods
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.formatColumnMenu = this.formatColumnMenu.bind(this);
  }

  /**
   * Enable highlight when the mouse hovers over the 'x'
   */
  handleMouseIn() {
    $('.' + this.props.colId).addClass('col-menu-highlight');
  }

  /**
   * Disable highlight when the mouse leaves the 'x'
   */
  handleMouseOut() {
    $('.' + this.props.colId).removeClass('col-menu-highlight');
  }

  /**
   * Show menu for this column formatting option
   * @param id the id of the column
   */
  formatColumnMenu(id) {
    // TODO: show the menu
    console.log('Accessed column type format menu for ' + id);
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // display the button
    return (
      <a role='button' data-toggle='tooltip' title='Format Column'
        className={'glyphicon glyphicon-option-vertical col-menu-button details-bar'}
        onClick={() => { this.formatColumnMenu(this.props.colId); }}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut} >
      </a>
    );
  }
}
/**
  * colId: column id
  */
FormatColumn.propTypes = {
  colId: PropTypes.string.isRequired,
};
