import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { IndexLink, Link } from 'react-router'; // eslint-disable-line no-unused-vars

import AccountsUIWrapper from './AccountsUIWrapper.jsx'; // eslint-disable-line no-unused-vars

import CreateTable from './tables/CreateTable.jsx'; // eslint-disable-line no-unused-vars

import ImportCSV from './tables/ImportCSV.jsx'; // eslint-disable-line no-unused-vars

import InsertRow from './comparison/InsertRow.jsx'; // eslint-disable-line no-unused-vars
import InsertColumn from './comparison/InsertColumn.jsx'; // eslint-disable-line no-unused-vars

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
    this.generateTestTable = this.generateTestTable.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.computeScore = this.computeScore.bind(this);
    this.getOptionNameId = this.getOptionNameId.bind(this);
  }

  /**
   * Create the table (for testing purposes)
   */
  generateTestTable() {
    Meteor.call('comparison.populateTable', this.props.params.tableId);
  }

  clearTable() {
    Meteor.call('comparison.clearTable', this.props.params.tableId);
  }

  getOptionNameId() {
    if (!this.props.cols || this.props.cols.length === 0) return '';
    return this.props.cols[0]._id;
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

  editMenu() {
    return <ul className='nav navbar-nav'>
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-edit' />Data
          </a>
        <ul className='dropdown-menu'>
          <li className="dropdown-header">Insert into Table</li>
          <li><InsertRow tableId={this.props.params.tableId}
            cols={this.props.cols} isDisabled={false} /></li>
          <li><InsertColumn tableId={this.props.params.tableId}
            rows={this.props.cols} isDisabled={false} optionIdx={this.getOptionNameId()} /></li>

          <li role='separator' className='divider'></li>
          <li className="dropdown-header">Generate Data</li>
          <li><ImportCSV tableId={this.props.params.tableId} /></li>
          <li><a role='button' onClick={this.generateTestTable}>Populate table</a></li>
        </ul>
      </li>
    </ul>;
  }

  // the run comparison button
  // TODO: make this like the edit enabled one
  calcScoreButton() {
    return <button title='Score Comparison'
        className='btn btn-default green'
        onClick={() => this.computeScore(this.getOptionNameId())}>
        <i className='glyphicon glyphicon-play'/>SCORE
    </button>;
  }

  clearDataButton() {
    return <button title='Empty Table'
        className='btn btn-danger'
        onClick={this.clearTable} >
        <i className='glyphicon glyphicon-trash'/>CLEAR
    </button>;
  }

  // inline editing on/off button
  editEnabledButton() {
    if (this.props.editEnabled === true) {
      return <button onClick={this.props.toggleEditOnOff}
        className="btn btn-primary" title='Toggle Editing'>
        <i className='glyphicon glyphicon-ok'/>EDIT</button>;
    }
    return <button onClick={this.props.toggleEditOnOff}
      className="btn btn-default blue" title='Toggle Editing'>
      <i className='glyphicon glyphicon-remove'/>EDIT</button>;
  }

  // the help button on the menu bar
  // TODO: make this a tutorial instead
  helpMenu() {
    return <ul className='nav navbar-nav navbar-right'>
      <li>
        <a href='https://github.com/adinutzyc21/ideal-engine/blob/master/README.md'
          className='blue' target='_blank' title='Help' >
          <i className='glyphicon glyphicon-question-sign'/> Help
          </a>
      </li>
    </ul>;
  }

  loginMenu() {
    // the login button on the menu bar
    return <ul className='nav navbar-nav navbar-right'>
      <li><a href='#'><AccountsUIWrapper /></a></li>
    </ul>;
  }

  fileMenu() {
    // the file menu should allow 'Load Table', 'New Table', TODO: 'Table from CSV'
    return <ul className='nav navbar-nav'>
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-menu-hamburger'/>File
          </a>
        <ul className='dropdown-menu'>
          <li><Link to="/SelectTable" activeClassName="active">Select Table</Link></li>
          <li><CreateTable /></li>
          <li><a href="/">Import CSV</a></li>
        </ul>
      </li>
    </ul>;
  }

  logoAndBrand() {
    // the brand and title on the menu bar
    return <div className='navbar-header'>
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
  }

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

  getHeaderHtml() {
    return <nav className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        {this.logoAndBrand()}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {this.fileMenu()}
          {this.editMenu()}
          <div className="btn-group nav-btn btn-group-xs" role="group">
            {this.clearDataButton()}
            {this.editEnabledButton()}
            {this.calcScoreButton()}
          </div>
          {this.loginMenu()}
          {this.helpMenu()}
        </div>
      </div>
    </nav>;
  }

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
