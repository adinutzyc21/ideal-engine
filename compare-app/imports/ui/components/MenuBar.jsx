import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router'; // eslint-disable-line no-unused-vars

import AccountsUIWrapper from './AccountsUIWrapper.jsx'; // eslint-disable-line no-unused-vars
import CreateTable from './tables/CreateTable.jsx'; // eslint-disable-line no-unused-vars
import ImportCSV from './tables/ImportCSV.jsx'; // eslint-disable-line no-unused-vars
import InsertData from './comparison/InsertData.jsx'; // eslint-disable-line no-unused-vars

export default class MenuBar extends Component {
  /**
   * Initialize state variables and bind 'this' to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      scoreOn: false,
    };

    // make 'this' available in these methods
    this.generateTestTable = this.generateTestTable.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.computeScore = this.computeScore.bind(this);
    this.getFirstColumnId = this.getFirstColumnId.bind(this);
    this.isTableEmpty = this.isTableEmpty.bind(this);
  }

  /**
   * Returns true if there are no columns (or rows) in the current table
   * (or if no table was loaded), false otherwise
   */
  isTableEmpty() {
    return !this.props.cols || this.props.cols.length === 0;
  }

  /**
   * Get the Id of the first column in the table
   * (the 'Option Name' column)
   */
  getFirstColumnId() {
    if (this.isTableEmpty()) return '';
    return this.props.cols[0]._id;
  }

  /**
   * Generate the table data using pre-existing values
   * (for testing/demo purposes)
   */
  generateTestTable(isDisabled) {
    if (!isDisabled) {
      Meteor.call('comparison.populateTable', this.props.params.tableId);
    }
  }

  /**
   * Delete the data in the current table
   */
  clearTable(isDisabled) {
    if (!isDisabled) {
      Meteor.call('comparison.clearTable', this.props.params.tableId);
    }
  }

  /**
   * For all rows calculate the row's score based on criteria and options scores
   */
  computeScore() {
    // TODO: this should be better math-wise
    const cols = this.props.cols;
    const rows = this.props.rows;

    // row[i][0].score = sum(for all columns j>=1) row[i][j].score*col[j].score
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

  /**
   * Create the footer which displays copyright information
   */
  getFooterHtml() {
    // get the year for the copyright
    let year = new Date().getFullYear() + ' ';
    if (year > 2016) year = '2016 - ' + year;

    return <nav className='navbar navbar-default navbar-fixed-bottom'>
      <div className='container' className='pager'>
        Copyright &#169; {year}Adina Stoica. All rights reserved.
          </div>
    </nav>;
  }

  /**
   * Create the 'Brand and Title' toolbar item
   */
  logoAndBrand() {
    return <div key='brand' className='navbar-header'>
      <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
        data-target='#collapsed-menu'>
        <span className='sr-only'>Toggle navigation</span>
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
      </button>

      <a className='navbar-brand' href='/'>
        <img alt='Brand' src='/img/logo.png' height='25px' />
      </a>
      <a className='navbar-text brand' href='/'>compareApp</a>
    </div>;
  }

  /**
   * Create the 'File' toolbar drop-down that contains options for table loading
   * - load existing table
   * - create a new table
   * - create a new table from an uploaded CSV file
   */
  fileMenu() {
    return <ul className='nav navbar-nav' key='file-menu' >
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-menu-hamburger'/>File
          </a>
        <ul className='dropdown-menu'>
          <li><Link to='/SelectTable' activeClassName='active'>Load Table</Link></li>
          <li><CreateTable /></li>
          <li className='disabled'><a href='#'>From CSV</a></li>
        </ul>
      </li>
    </ul>;
  }

  /**
   * Create the 'Edit' toolbar drop-down that contains options for editing the current table
   * - toggle inline editing
   * - insert row
   * - insert column
   * - generate table
   * - import CSV into table
   * - delete all data in the current table
   */
  editMenu() {
    return <ul className='nav navbar-nav' key='table'>
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-edit' />Edit
          </a>
        <ul className='dropdown-menu'>
          <li className='dropdown-header'>Inline Editing</li>
          <li>{this.editEnabledToggle(this.isTableEmpty())}</li>
          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Create</li>

          <li><InsertData level='row' tableId={this.props.params.tableId}
            data={this.props.cols} isDisabled={false} /></li>

          <li className={this.isTableEmpty() ? 'disabled' : ''}>
            <InsertData level='col' tableId={this.props.params.tableId}
              data={this.props.rows} isDisabled={this.isTableEmpty()}
              optionId={this.getFirstColumnId()} /></li>

          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Generate</li>

          <li className={!this.isTableEmpty() ? 'disabled' : ''}>
            <ImportCSV tableId={this.props.params.tableId}
              isDisabled={!this.isTableEmpty()} /></li>
          <li className={!this.isTableEmpty() ? 'disabled' : ''}>
            <a role='button' onClick={() => this.generateTestTable(!this.isTableEmpty())}>
              Populate table</a></li>

          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Delete</li>
          <li className={this.isTableEmpty() ? 'disabled' : ''}>
            <a role='button' onClick={() => this.clearTable(this.isTableEmpty())}>
              Clear table</a></li>
        </ul>
      </li>
    </ul>;
  }

  /**
   * Inline editing on/off toggle that is displayed in the 'Edit' drop-down
   */
  editEnabledToggle(isDisabled) {
    let btnClass = '';
    if (isDisabled) btnClass = 'disabled';
    if (this.props.editEnabled === true) {
      return <div className="btn-group btn-group-xs btn-toggle nav-btn on-off-switch">
        <button className={'btn btn-primary ' + btnClass}>ON</button>
        <button onClick={() => this.props.toggleEditOnOff(isDisabled)}
          className={'btn btn-default ' + btnClass}>OFF</button>
      </div>;
    }
    return <div className="btn-group btn-group-xs btn-toggle nav-btn on-off-switch">
      <button onClick={() => this.props.toggleEditOnOff(isDisabled)}
        className={'btn btn-default ' + btnClass}>ON</button>
      <button className={'btn btn-primary ' + btnClass}>OFF</button>
    </div>;
  }

  /**
   * Inline editing on/off button that is displayed directly on the MenuBar
   */
  editEnabledButton() {
    if (this.props.editEnabled === true) {
      return <button onClick={() => this.props.toggleEditOnOff(false)}
        className='btn btn-xs btn-success active' title='Inline Editing'>
        <span className='glyphicon glyphicon-pencil' /></button>;
    }
    return <button onClick={() => this.props.toggleEditOnOff(false)}
      className='btn btn-xs btn-default' title='Inline Editing'>
      <span className='glyphicon glyphicon-pencil' /></button>;
  }

  /**
   * Inline clear table button that is displayed directly on the MenuBar
   */
  clearTableButton() {
    return <button key='del' title='Clear Table'
      className=' btn btn-xs btn-danger'
      onClick={() => this.clearTable(false)} >
      <span className='glyphicon glyphicon-trash' />
    </button>;
  }

  /**
   * Create the 'run comparison' button
   */
  calcScoreButton() {
    // TODO: make this like the edit enabled one
    return <button key='run' title='Score Comparison'
      className=' btn btn-xs btn-default green run'
      onClick={() => this.computeScore(this.getFirstColumnId())} >
      <span className='glyphicon glyphicon-play' />
    </button>;
  }

  /**
   * Create the 'Help' toolbar item
   */
  helpMenu() {
    // TODO: make this a tutorial instead
    return <ul className='nav navbar-nav navbar-right' key='help-menu'>
      <li>
        <a href='https://github.com/adinutzyc21/ideal-engine/blob/master/README.md'
          className='blue' target='_blank' title='Help' >
          <i className='glyphicon glyphicon-question-sign'/> Help
          </a>
      </li>
    </ul>;
  }

  /**
   * Create the 'Login' toolbar item
   */
  loginMenu() {
    // the login button on the menu bar
    return <ul className='nav navbar-nav navbar-right' key='login-menu'>
      <li><a href='#'><AccountsUIWrapper /></a></li>
    </ul>;
  }

  /**
   * Create the MenuBar html based on the current view and data
   */
  getHeaderHtml() {
    const barHtml = [];

    // TODO: except the login
    // everyone will have a file menu
    barHtml.push(this.fileMenu());

    // only if we're on the DisplayTable page do we have an edit menu
    if (this.props.route.path === '/DisplayTable/:tableId') {
      barHtml.push(this.editMenu());

      // editing in-place and calculating scores only if we've loaded data
      if (!this.isTableEmpty()) {
        const spacing = <span className='btn-spacing' />;
        barHtml.push(
          <ul className='nav navbar-nav' key='inline-menu'>
            <li className="divider-vertical"></li>
            <li><a>
              {this.editEnabledButton()}
              {spacing}
              {this.clearTableButton()}
              {spacing}
              {this.calcScoreButton()}
            </a></li>
            <li className="divider-vertical"></li>
          </ul>);
      }
    }

    // everyone will have a help and login option
    barHtml.push(this.loginMenu());
    barHtml.push(this.helpMenu());

    return <nav className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        {this.logoAndBrand()}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {barHtml}
        </div>
      </div>
    </nav>;
  }

  /**
   * Render the MenuBar
   */
  render() {
    return (
      <span>
        {this.getHeaderHtml()}
        {this.getFooterHtml()}
      </span>
    );
  }
}

/**
 * The properties retrieved in this component:
 * rows {Array} - the data in the Mongo Rows table
 * cols {Array} - the data in the Mongo Cols table
 * TODO:
 */
MenuBar.propTypes = {
  rows: PropTypes.array,
  cols: PropTypes.array,
  toggleEditOnOff: PropTypes.any,
  editEnabled: PropTypes.bool,
};
