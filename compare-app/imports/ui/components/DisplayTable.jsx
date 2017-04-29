import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import BuildHeader from './comparison/BuildHeader.jsx'; // eslint-disable-line no-unused-vars
import BuildRow from './comparison/BuildRow.jsx'; // eslint-disable-line no-unused-vars

/**
 * DisplayTable component - either display the loaded table or a no data message
 */
export class DisplayTable extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      height: 50,
    };
    // make this available in these methods
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  /**
   * Update dimensions to set table-container height correctly based on the window size
   */
  updateDimensions() {
    let height = $(window).height() - 120;
    if (height < 150) height = 150;
    this.setState({ height });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Render the table
   */
  render() {
    $('.table-container').css('max-height', this.state.height + 'px');

    // this is the final html for our table
    const tableContainerHtml = [];

    // if the data is empty, the html is no data available info
    if (this.props.rows.length === 0) {
      // clear the residual columns
      Meteor.call('comparison.clearTable', this.props.params.tableId);

      tableContainerHtml.push(
        <div key='table-container' className='table-container table-container-no-data'>
          <span>No data available. Use the menu to add data.</span>
        </div>);

      // the html is the loaded table
    } else {
      tableContainerHtml.push(
        <div key='table-container' className='table-container'>
          <table key='table'>
            {/* Need a header of type BuildHeader */}
            <BuildHeader key='heading' cols={this.props.cols}
              editEnabled={this.props.editEnabled} />
            {/* Need a bunch of rows of type BuildRow*/}
            <BuildRow key='row' rows={this.props.rows} cols={this.props.cols}
              editEnabled={this.props.editEnabled} />
          </table>
        </div>);
    }

    // display the constructed HTML
    return (
      <div className='react-bs-container-body'>
        {tableContainerHtml}
      </div>
    );
  }
}

/**
 * The properties retrieved in this component:
 * rows {Array} - the data in the Mongo Rows table
 * cols {Array} - the data in the Mongo Cols table
 * TODO:
 */
DisplayTable.propTypes = {
  rows: PropTypes.array,
  cols: PropTypes.array,
  toggleEditOnOff: PropTypes.any,
  editEnabled: PropTypes.bool,
};