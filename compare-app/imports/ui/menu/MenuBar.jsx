import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import AccountsUIWrapper from '../login/AccountsUIWrapper.jsx'; // eslint-disable-line no-unused-vars
import DataInsert from './DataInsert.jsx'; // eslint-disable-line no-unused-vars

import ComputeScore from './ComputeScore.jsx'; // eslint-disable-line no-unused-vars
import TableSelect from '../select/TableSelect.jsx'; // eslint-disable-line no-unused-vars
import TableCreate from '../select/TableCreate.jsx'; // eslint-disable-line no-unused-vars
import LoadCSV from '../select/LoadCSV.jsx'; // eslint-disable-line no-unused-vars

/**
 * Menu Bar - create the menu bar depending on the current view
 * Potential views:
 * - login screen
 * - table selection
 * - table manipulation
 */
export default class MenuBar extends Component {
  /**
   * Initialize state variables and bind 'this' to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      currentView: 'loadTable',
    };

    // make this available in these methods
    this.isActive = this.isActive.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.disabledClass = this.disabledClass.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.populateDocument = this.populateDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Set the current view to the one received through the 'props'
   */
  componentWillReceiveProps() {
    if (this.props.currentView !== undefined) {
      this.setState({ currentView: this.props.currentView });
    }
  }

  loadTable() {
    ReactDOM.render(<TableSelect />, document.getElementById('app-container'));
    this.setState({ currentView: 'loadTable' });
  }

  isActive(menuString) {
    return menuString === this.state.currentView ? 'active' : 'default';
  }

  isEmpty() {
    return this.props.cols === undefined ||
      this.props.rows === undefined ||
      (this.props.cols.length === 0 && this.props.rows.length === 0);
  }

  getOptionNameId() {
    if (this.props.cols.length === 0) return '';
    return this.props.cols[0]._id;
  }

  disabledClass(menuString) {
    switch (menuString) {
      case 'populateTable':
        if (!this.isEmpty()) { return 'disabled'; }
        break;
      case 'emptyTable':
        if (this.isEmpty()) { return 'disabled'; }
        break;
      case 'addCol':
        if (this.isEmpty()) { return 'disabled'; }
        break;
      default:
        return 'default';
    }
    return 'default';
  }

  isDisabled(menuString) {
    switch (menuString) {
      case 'populateTable':
        if (!this.isEmpty()) { return true; }
        break;
      case 'emptyTable':
        if (this.isEmpty()) { return true; }
        break;
      case 'addCol':
        if (this.isEmpty()) { return true; }
        break;
      default:
        return false;
    }
    return false;
  }

  deleteDocument() {
    if (!this.isDisabled('emptyTable')) {
      Meteor.call('comparison.clearTable', this.props.tableId);
    }
  }
  /**
   * Create the table (for testing purposes)
   */
  populateDocument() {
    if (!this.isDisabled('populateTable')) {
      Meteor.call('comparison.populateTables', this.props.tableId);
    }
  }

  createHtml() {
    // the brand and title on the menu bar
    const brandAndTitle =
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
          data-target='#collapsed-menu'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
        <a className='navbar-brand' href='/'>
          <img alt='Brand' src='/logo.png' height='25px' />
        </a>
        <a href='/'><p className='navbar-text title'>compareApp</p></a>
      </div>;

    // the login button on the menu bar
    const loginButton =
      <div className='nav navbar-nav navbar-right'>
        <li><a href='#'><AccountsUIWrapper /></a></li>
      </div>;

    // the help button on the menu bar
    const helpButton =
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <a href='https://github.com/adinutzyc21/ideal-engine/blob/master/README.md'
            className='blue' target='_blank' title='Help' >
            <span className='glyphicon glyphicon-question-sign'></span> Help
                    </a>
        </li>
      </ul>;

    // the file menu allows 'Load Table', 'New Table', 'Table from CSV'
    const fileMenu =
      <ul className='nav navbar-nav'>
        <li className='dropdown'>
          <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
            <span className='glyphicon glyphicon-menu-hamburger'></span> File
                    </a>
          <ul className='dropdown-menu'>
            <li role='button' className={this.isActive('loadTable')}>
              <a role='button' onClick={this.loadTable}>Load Table</a></li>
            <li role='button' className={this.isActive('newTable')}>
              <TableCreate /></li>
          </ul>
        </li>
      </ul>;

    let editMenu = <div></div>;
    let calcScoreButton = <div></div>;

    if (this.state.currentView !== 'loadTable' && this.props.cols !== undefined && this.props.rows !== undefined) {
      editMenu =
        <ul className='nav navbar-nav'>
          <li className='dropdown'>
            <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
              <span className='glyphicon glyphicon-pencil'></span> Edit
                        </a>
            <ul className='dropdown-menu'>
              <li className={this.disabledClass('addRow')}>
                <DataInsert key='row' level='row'
                  data={this.props.cols}
                  tableId={this.props.tableId}
                  isDisabled={this.isDisabled('addRow')}
                />
              </li>
              <li className={this.disabledClass('addCol')}>
                <DataInsert key='col' level='col'
                  data={this.props.rows}
                  optionIdx={this.getOptionNameId()}
                  tableId={this.props.tableId}
                  isDisabled={this.isDisabled('addCol')} />
              </li>

              <li role='separator' className='divider'></li>
              <li role='button' className={this.isActive('loadCSV')}>
                <LoadCSV tableId={this.props.tableId} /></li>

              <li role='separator' className='divider'></li>
              <li className={this.disabledClass('populateTable')}>
                <a role='button' onClick={this.populateDocument}>Populate table</a>
              </li>
              <li className={this.disabledClass('emptyTable')}>
                <a role='button' onClick={this.deleteDocument}>Empty table</a>
              </li>
            </ul>
          </li>
        </ul>;

      if (!this.isEmpty()) {
        calcScoreButton = <ComputeScore rows={this.props.rows}
          cols={this.props.cols} optionIdx={this.getOptionNameId()} />;
      }
    }

    return (
      <div className='container'>
        {brandAndTitle}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {fileMenu}
          {editMenu}
          {calcScoreButton}
          {loginButton}
          {helpButton}
        </div>
      </div>

    );
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        {this.createHtml()}
      </nav>
    );
  }
}

MenuBar.propTypes = {
  cols: PropTypes.array,
  rows: PropTypes.array,
  tableId: PropTypes.string,
  currentView: PropTypes.string,
};
