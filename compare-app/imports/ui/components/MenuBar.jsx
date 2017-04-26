import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import { IndexLink, Link } from 'react-router'; // eslint-disable-line no-unused-vars

import AccountsUIWrapper from './AccountsUIWrapper.jsx'; // eslint-disable-line no-unused-vars

// import ImportCSV from './tables/ImportCSV.jsx'; // eslint-disable-line no-unused-vars
import CreateTable from '../../ui/components/tables/CreateTable.jsx'; // eslint-disable-line no-unused-vars

/**
 * Menu Bar - create the menu bar depending on the current view
 * Potential views:
 * - login screen
 * - table selection
 * - table manipulation
 */
export default class MenuBar extends Component {

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

    // the file menu should allow 'Load Table', 'New Table', TODO: 'Table from CSV'
    const file =
      <ul className='nav navbar-nav'>
        <li className='dropdown'>
          <a className='dropdown-toggle' data-toggle='dropdown' role='button'>
            <span className='glyphicon glyphicon-menu-hamburger'></span> File
          </a>
          <ul className='dropdown-menu'>
            <li><Link to="/SelectTable" activeClassName="active">Select Table</Link></li>
            <li><CreateTable /></li>
            <li><a href="/">Import CSV</a></li>
          </ul>
        </li>
      </ul>;

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

    return (
      <div className='container'>
        {logo}
        <div className='collapse navbar-collapse' id='collapsed-menu'>
          {file}
          {login}
          {help}
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

    // this.toggleEditOnOff = this.toggleEditOnOff.bind(this);
  // toggleEditOnOff() {
  //   this.setState({ editEnabled: !this.state.editEnabled });
  // }