import React, { Component, PropTypes } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import DataInsert from './DataInsert.jsx';

// Column component - represents columns in the table
export default class MenuBar extends Component {
    /**
       * Extract the option names from the information available in the database: 
       * this is the union of all properties of each row object in the database
       * E.g: 
       * Input: [{"Option": "Chase","Age": "27"},
       *         {"Option": "Joe", "Height": "5'7"'}],
       * Output: ["Chase", "Joe"]
       * @returns all the options (item names) in the database
       */
    parseOptions(optionList) {
        var options = [];
        for (var i = 0, len = optionList.length; i < len; i++) {
            options.push({
                id: optionList[i]._id,
                name: optionList[i].Option
            });
        }
        return options;
    }

    createHtml() {
        var brandAndTitle =
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    <img alt="Brand" src="/logo.png" height="25px" />
                </a>
                <p className="navbar-text title">compareApp</p>
            </div>

        var hasNoData = false;
        if (this.props.cols.length === 0) {
            // disable the add column option
            hasNoData = true;
        }

        var actionsMenu =
            <ul className="nav navbar-nav">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" data-on="On" data-off="Off">
                        Menu
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <DataInsert key="row" hasNoData={hasNoData} level="row" data={this.props.cols} />
                        <DataInsert key="col" hasNoData={hasNoData} level="col" data={this.parseOptions(this.props.rows)} />
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Load from CSV</a></li>
                        <li><a href="#">Export to CSV</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Delete comparison</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Populate table</a></li>
                    </ul>
                </li>
            </ul>

        var loginOption =
            <div className="nav navbar-nav navbar-right">
                <li><a href="#"><AccountsUIWrapper /></a></li>
            </div>

        return (
            <div className="container">
                {brandAndTitle}
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
    cols: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
};