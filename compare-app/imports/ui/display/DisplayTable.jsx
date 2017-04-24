import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit'; // eslint-disable-line no-unused-vars

import { Row, Col } from '../../api/comparison.js';

import BuildHeader from './BuildHeader.jsx'; // eslint-disable-line no-unused-vars
import BuildRow from './BuildRow.jsx'; // eslint-disable-line no-unused-vars
import MenuBar from '../menu/MenuBar.jsx'; // eslint-disable-line no-unused-vars

/**
 * DisplayTable component - either display the loaded table or a loading / no data message
 */
class DisplayTable extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      height: 50,
      editEnabled: false,
    };
    // make this available in these methods
    this.updateDimensions = this.updateDimensions.bind(this);
    this.toggleEditOnOff = this.toggleEditOnOff.bind(this);
  }


  toggleEditOnOff() {
    this.setState({ editEnabled: !this.state.editEnabled });
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

    // while the data is loading, the html is a spinner
    if (this.props.loading) {
      tableContainerHtml.push(
        <div key='table-container' className='table-container table-container-no-data'>
          <div key='loading'>
            <span>Loading data...</span>
            <Spinner key='spinner' spinnerName='three-bounce' />
          </div>
        </div>);

    // if the data is empty, the html is no data available info
    } else if (this.props.rows.length === 0) {
      // clear the residual columns
      Meteor.call('comparison.clearTable', this.props.tableId);

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
              editEnabled={this.state.editEnabled}/>
            {/* Need a bunch of rows of type BuildRow*/}
            <BuildRow key='row' rows={this.props.rows} cols={this.props.cols}
              editEnabled={this.state.editEnabled}/>
          </table>
        </div>);
    }

    // display the constructed HTML
    return (
      <div className='react-bs-container-body'>
        <MenuBar key='menu' currentView='DisplayTable' rows={this.props.rows}
              cols={this.props.cols} tableId={this.props.tableId}
              editEnabled={this.state.editEnabled}
              toggleEditOnOff={this.toggleEditOnOff}/>
        {tableContainerHtml}
      </div>
    );
  }
}

/**
 * The properties retrieved in this component:
 * tableId {String} - ID of the Mongo table
 * loading {Boolean} - is the data still loading or is it done
 * rows {Array} - the data in the Mongo Rows table
 * cols {Array} - the data in the Mongo Cols table
 * user {Object} - the current logged in user from Meteor
 */
DisplayTable.propTypes = {
  tableId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  rows: PropTypes.array,
  cols: PropTypes.array,
  user: PropTypes.object,
};

/**
 * A Meteor createContainer component which retrieves data from Meteor & Mongo
 */
export default createContainer((props) => {
  // subscribe to the row data from Mongo
  const subscriptionR = Meteor.subscribe('row');
  // is the row data still loading
  const loadingR = !subscriptionR.ready();
  // get the row data from Mongo
  const rows = Row.find({ tableId: props.tableId }, { sort: { score: -1 } }).fetch();

  // subscribe to the col data from Mongo
  const subscriptionC = Meteor.subscribe('col');
  // is the col data still loading
  const loadingC = !subscriptionC.ready();
  // get the col data from Mongo
  const cols = Col.find({ tableId: props.tableId }).fetch();

  // get the currently logged in user from Meteor
  const user = Meteor.user();
  // are we done loading the user?
  const loadingU = Meteor.user() === undefined;

  // are we done loading everything?
  const loading = loadingR || loadingC || loadingU;

  // pass this properties to DisplayTable in addition to what's already passed
  return {
    loading,
    rows,
    cols,
    user,
  };
}, DisplayTable);
