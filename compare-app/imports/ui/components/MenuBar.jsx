import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import AccountsUIWrapper from './AccountsUIWrapper.jsx'; // eslint-disable-line no-unused-vars
import InsertData from './comparison/InsertData.jsx'; // eslint-disable-line no-unused-vars

import { SelectTable } from './SelectTable.jsx'; // eslint-disable-line no-unused-vars
import CreateTable from './tables/CreateTable.jsx'; // eslint-disable-line no-unused-vars
import ImportCSV from './tables/ImportCSV.jsx'; // eslint-disable-line no-unused-vars

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

    // make 'this' available in these methods
    this.isActive = this.isActive.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.disabledClass = this.disabledClass.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.populateDocument = this.populateDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.computeScore = this.computeScore.bind(this);
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
    ReactDOM.render(<SelectTable />, document.getElementById('app-container'));
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
    const logo =
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
          data-target='#collapsed-menu'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
        <a className='navbar-brand' href='/'>
          <img alt='Brand' src='/img/logo.png' height='25px' /></a>
        <a href='/'>
        <p className='navbar-text title'>compareApp</p></a>
      </div>;

    // the login button on the menu bar
    const login =
      <ul className='nav navbar-nav navbar-right'>
        <li><a href='#'><AccountsUIWrapper /></a></li>
      </ul>;

    // the help button on the menu bar
    // TODO: make this a tutorial instead
    const help =
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <a href='https://github.com/adinutzyc21/ideal-engine/blob/master/README.md'
            className='blue' target='_blank' title='Help' >
            <span className='glyphicon glyphicon-question-sign'></span> Help
          </a>
        </li>
      </ul>;

    /*// the file menu allows 'Load Table', 'New Table', 'Table from CSV'
    const fileMenu =
      <ul className='nav navbar-nav'>
        <li className='dropdown'>
          <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
            <span className='glyphicon glyphicon-menu-hamburger'></span> File</a>
          <ul className='dropdown-menu'>
            <li className={this.isActive('loadTable')}>
              <a role='button' onClick={this.loadTable}>Load Table</a></li>
            <li className={this.isActive('newTable')}>
              <CreateTable /></li>
          </ul>
        </li>
      </ul>;

    let editMenu = <div></div>;
    let calcScore = <div></div>;
    let enableEdit = <div></div>;

    if (this.state.currentView !== 'loadTable' && this.props.cols !== undefined && this.props.rows !== undefined) {
      editMenu =
        <ul className='nav navbar-nav'>
          <li className='dropdown'>
            <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
              <span className='glyphicon glyphicon-pencil'></span> Edit</a>
            <ul className='dropdown-menu'>
              <li className={this.disabledClass('addRow')}>
                <InsertData key='row' level='row'
                  data={this.props.cols}
                  tableId={this.props.tableId}
                  isDisabled={this.isDisabled('addRow')}
                />
              </li>
              <li className={this.disabledClass('addCol')}>
                <InsertData key='col' level='col'
                  data={this.props.rows}
                  optionIdx={this.getOptionNameId()}
                  tableId={this.props.tableId}
                  isDisabled={this.isDisabled('addCol')} />
              </li>

              <li role='separator' className='divider'></li>
              <li className={this.isActive('ImportCSV')}>
                <ImportCSV tableId={this.props.tableId} /></li>

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
        calcScore = <button title='Score Comparison!'
          className='btn btn-default btn-xs green nav-btn'
              onClick={() => this.computeScore(this.getOptionNameId())}>
              <span className='glyphicon glyphicon-play'></span>Compare
            </button>;

        if (this.props.editEnabled === true) {
          enableEdit = <div className="btn-group btn-group-xs btn-toggle nav-btn">
            <button className="btn btn-primary active">
              ON</button>
            <button onClick={this.props.toggleEditOnOff} className="btn btn-default">
              OFF</button>
          </div>;
        } else {
          enableEdit = <div className="btn-group btn-group-xs btn-toggle nav-btn">
            <button onClick={this.props.toggleEditOnOff} className="btn btn-default">
              ON</button>
            <button className="btn btn-primary active">
              OFF</button>
          </div>;
        }
      }
    }*/

    return (
      <div className='container'>
        {logo}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {/* {fileMenu}
          {editMenu}
          <div className='nav navbar-nav navbar-center'>
            {enableEdit}
            {calcScore}
          </div> */}
          {login}
          {help}
        </div>
      </div>

    );
  }

  /**
   * for all rows calculate row[i][0].score
   * = sum(for all columns j>=1) row[i][j].score*col[j].score
   */
  computeScore() {
    const cols = this.props.cols;
    const rows = this.props.rows;

    let maxScore = 0;
    const score = [];
    // for all rows i
    for (let i = 0, lenR = rows.length; i < lenR; i++) {
      score[i] = 0;
      // for all columns j
      for (let j = 1, lenC = cols.length; j < lenC; j++) {
        score[i] += rows[i][cols[j]._id].score * cols[j].score;
      }
      if (score[i] > maxScore) maxScore = score[i];
    }
    for (let i = 0, lenR = rows.length; i < lenR; i++) {
      score[i] = Math.round((score[i] * 100) / maxScore) / 10;
      Meteor.call('comparison.updateRowInsertScore', rows[i]._id, score[i]);
    }
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
  toggleEditOnOff: PropTypes.any,
  editEnabled: PropTypes.bool,
};
