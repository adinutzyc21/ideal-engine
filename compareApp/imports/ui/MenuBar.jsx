import React, { Component, PropTypes } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import DataInsert from './DataInsert.jsx';

// Column component - represents columns in the table
export default class MenuBar extends Component {
  /**
     * Extract the option names from the information available in the database: 
     * this is the union of all properties of each row object in the database
     * E.g: 
     * Input: [{"Item": "Chase","Age": "27"},
     *         {"Item": "Joe", "Height": "5'7"'}],
     * Output: ["Chase", "Joe"]
     * @returns all the items in the database
     */
    parseItems(list) {
        var items = [];
        for (var i = 0, len = list.length; i < len; i++) {
          items.push({
            id: list[i]._id,
            item: list[i].Item});
        }
        return items;
    }

    createHtml() {
        {/* Brand and toggle get grouped for better mobile display */ }
        var brandAndToggle =
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    <img alt="Brand" src="/logo.png" height="25px" />
                </a>
                <p className="navbar-text title">compareApp</p>
            </div>


        {/* Collect the nav links, forms, and other content for toggling */ }
        var actionsMenu =
            <ul className="nav navbar-nav">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" data-on="On" data-off="Off">
                        Menu
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <DataInsert key="col" level="col" data={this.parseItems(this.props.rows)} color="blue" name="Add a column" tooltip="Add a column"/>
                        <li role="separator" className="divider"></li>
                        <DataInsert key="row" level="row" data={this.props.cols} color="cyan" name="Add a row" tooltip="Add a row"/>
                    </ul>
                </li>
            </ul>

        var loginOption =
            <div className="nav navbar-nav navbar-right">
                <li><a href="#"><AccountsUIWrapper /></a></li>
            </div>

        return (
            <div className="container">
                {brandAndToggle}
                {actionsMenu}
                {loginOption}
            </div>

        );
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                {this.createHtml()}
            </nav>
        );
    }
}

MenuBar.propTypes = {
  // This component gets the items to display through a React prop.
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};