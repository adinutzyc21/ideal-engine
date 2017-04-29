import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Spinner from 'react-spinkit'; // eslint-disable-line no-unused-vars

import { Row, Col } from '../../api/comparison/comparison.js';

class Comp extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      editEnabled: false,
    };
    // make this available in these methods
    this.toggleEditOnOff = this.toggleEditOnOff.bind(this);
  }

  /** Is editing enabled or not */
  toggleEditOnOff(isDisabled) {
    if (!isDisabled) {
      this.setState({ editEnabled: !this.state.editEnabled });
    }
  }

  render() {
    // this is the final html for our table
    let displayTable = [];
    let menuBar = [];
    // while the data is loading, the html is a spinner
    if (this.props.loading) {
      displayTable.push(
        <div key='table-container' className='table-container table-container-no-data'>
          <div key='loading'>
            <span>Loading data...</span>
            <Spinner key='spinner' spinnerName='three-bounce' />
          </div>
        </div>);
    } else {
      // the Display Table properties
      displayTable = React.Children.map(this.props.main, child => React.cloneElement(child, {
        rows: this.props.rows,
        cols: this.props.cols,
        editEnabled: this.state.editEnabled,
        toggleEditOnOff: this.toggleEditOnOff,
      }));
      // the Menu Bar properties
      menuBar = React.Children.map(this.props.sidebar, child => React.cloneElement(child, {
        rows: this.props.rows,
        cols: this.props.cols,
        editEnabled: this.state.editEnabled,
        toggleEditOnOff: this.toggleEditOnOff,
      }));
    }

    return (
      <div className='container'>
        <div className="content">
          {displayTable}
        </div>
        <div className="menu">
          {menuBar}
        </div>
      </div>);
  }
}

Comp.propTypes = {
  tableId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  user: PropTypes.object,
};

/**
 * A Meteor createContainer component which retrieves data from Meteor & Mongo
 */
export default createContainer((props) => {
  // get the tableId
  const tableId = props.params.tableId;

  // subscribe to the row data from Mongo
  const subscriptionR = Meteor.subscribe('row');
  // is the row data still loading
  const loadingR = !subscriptionR.ready();
  // get the row data from Mongo
  const rows = Row.find({ tableId }, { sort: { score: -1 } }).fetch();

  // subscribe to the col data from Mongo
  const subscriptionC = Meteor.subscribe('col');
  // is the col data still loading
  const loadingC = !subscriptionC.ready();
  // get the col data from Mongo
  const cols = Col.find({ tableId }).fetch();

  // get the currently logged in user from Meteor
  const user = Meteor.user();
  // are we done loading the user?
  const loadingU = Meteor.user() === undefined;

  // are we done loading everything?
  const loading = loadingR || loadingC || loadingU;

  // pass this properties to DisplayTable in addition to what's already passed
  return {
    tableId,
    loading,
    rows,
    cols,
    user,
  };
}, Comp);
