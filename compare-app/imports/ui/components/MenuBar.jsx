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
      currentView: 'loadTable',
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
  generateTestTable() {
    Meteor.call('comparison.populateTable', this.props.params.tableId);
  }

  /**
   * Delete the data in the current table
   */
  clearTable() {
    Meteor.call('comparison.clearTable', this.props.params.tableId);
  }

  editMenu() {
    return <ul className='nav navbar-nav' key='table'>
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-edit' />Edit
          </a>
        <ul className='dropdown-menu'>
          <li className='dropdown-header'>In-line Editing</li>
          <li>{this.editEnabledSwitch()}</li>
          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Create</li>

          <li><InsertData level='row' tableId={this.props.params.tableId}
            data={this.props.cols} isDisabled={false} /></li>

           <li><InsertData level='col' tableId={this.props.params.tableId}
            data={this.props.rows} isDisabled={false} optionId={this.getFirstColumnId()} /></li>

          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Generate</li>
          <li><ImportCSV tableId={this.props.params.tableId} /></li>
          <li><a role='button' onClick={this.generateTestTable}>Populate table</a></li>

          <li role='separator' className='divider'></li>
          <li className='dropdown-header'>Delete</li>
          <li><a role='button' onClick={this.clearTable} >Clear table</a></li>
        </ul>
      </li>
    </ul>;
  }

  // the run comparison button
  // TODO: make this like the edit enabled one
  calcScoreButton() {
    return <ul className='nav navbar-nav' key='score'>
      <li><a>
        <button key='run' title='Score Comparison'
          className=' btn btn-xs btn-default green run'
          onClick={() => this.computeScore(this.getFirstColumnId())}>
          <i className='glyphicon glyphicon-play'/>RUN
      </button>
      </a></li>
      <li className="divider-vertical"></li>
    </ul>;
  }

  // inline editing on/off button
  editEnabledButton() {
    let html;
    if (this.props.editEnabled === true) {
      html = <button onClick={this.props.toggleEditOnOff}
        className='btn btn-xs btn-success' title='In-Line Editing'>
        <span className='glyphicon glyphicon-pencil' /></button>;
    } else {
      html = <button onClick={this.props.toggleEditOnOff}
        className='btn btn-xs btn-default red' title='Toggle Editing'>
        <span className='glyphicon glyphicon-pencil'/></button>;
    }
    return <ul className='nav navbar-nav' key='edit'>
      <li className="divider-vertical"></li>
      <li><a> {html} </a></li>
      </ul>;
  }

  editEnabledSwitch() {
    if (this.props.editEnabled === true) {
      return <div className="btn-group btn-group-xs btn-toggle nav-btn on-off-switch">
        <button className="btn btn-primary active">
          ON</button>
        <button onClick={this.props.toggleEditOnOff} className="btn btn-default">
          OFF</button>
      </div>;
    }
    return <div className="btn-group btn-group-xs btn-toggle nav-btn on-off-switch">
      <button onClick={this.props.toggleEditOnOff} className="btn btn-default">
        ON</button>
      <button className="btn btn-primary active">
        OFF</button>
    </div>;
  }

  // the help button on the menu bar
  // TODO: make this a tutorial instead
  helpMenu() {
    return <ul className='nav navbar-nav navbar-right' key='help-menu'>
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
    return <ul className='nav navbar-nav navbar-right' key='login-menu'>
      <li><a href='#'><AccountsUIWrapper /></a></li>
    </ul>;
  }

  fileMenu() {
    // the file menu should allow 'Load Table', 'New Table', TODO: 'Table from CSV'
    return <ul className='nav navbar-nav' key='file-menu' >
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
          <i className='glyphicon glyphicon-menu-hamburger'/>File
          </a>
        <ul className='dropdown-menu'>
          <li><Link to='/SelectTable' activeClassName='active'>Select Table</Link></li>
          <li><CreateTable /></li>
          <li><a href='/'>Table from CSV</a></li>
        </ul>
      </li>
    </ul>;
  }

  logoAndBrand() {
    // the brand and title on the menu bar
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

  composeMenuBar() {
    const barHtm = [];

    // TODO: except the login
    // everyone will have a file menu as well as a help and login option
    barHtm.push(this.fileMenu());
    barHtm.push(this.loginMenu());
    barHtm.push(this.helpMenu());

    // only if we're on the DisplayTable page do we have an edit menu
    if (this.props.route.path === '/DisplayTable/:tableId') {
      barHtm.push(this.editMenu());

      // editing in-place and calculating scores only if we've loaded data
      if (!this.isTableEmpty()) {
        barHtm.push(this.editEnabledButton());
        barHtm.push(this.calcScoreButton());
      }
    }

    return barHtm;
  }

  getHeaderHtml() {
    return <nav className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        {this.logoAndBrand()}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {this.composeMenuBar()}
        </div>
      </div>
    </nav>;
  }


  // TODO: this should be better
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
