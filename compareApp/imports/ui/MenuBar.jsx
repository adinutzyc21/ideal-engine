import React, { Component, PropTypes } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import DataInsert from './DataInsert.jsx';
import DataHelperMenu from './DataHelperMenu.jsx'

import ScoreComparison from './ScoreComparison.jsx'

// Column component - represents columns in the table
export default class MenuBar extends Component {
    isColumnsEmpty() {
        return this.props.cols.length === 0;
    }

    getOptionNameIdx() {
        if (this.props.cols.length === 0) return "";
        return this.props.cols[0]._id;
    }


    createHtml() {
        var brandAndTitle =
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#collapsed-menu">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">
                    <img alt="Brand" src="/logo.png" height="25px" />
                </a>
                <p className="navbar-text title">compareApp</p>
            </div>

        var fileMenu = <div></div>;
        var editMenu = <div></div>;
        var calcScoreButton = <div></div>;
        if (!this.props.loading) {
            editMenu =
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                            <span className="glyphicon glyphicon-pencil"></span> Edit
                        </a>
                        <ul className="dropdown-menu">
                            <DataInsert key="row" level="row" data={this.props.cols} />
                            <DataInsert key="col" columnsEmpty={this.isColumnsEmpty()} level="col" data={this.props.rows} optionIdx={this.getOptionNameIdx()} />
                            <li role="separator" className="divider"></li>
                            <DataHelperMenu key="del" type="del" columnsEmpty={this.isColumnsEmpty()} />
                            <DataHelperMenu key="pop" type="pop" columnsEmpty={this.isColumnsEmpty()} />
                        </ul>
                    </li>
                </ul>;

            fileMenu =
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                            <span className="glyphicon glyphicon-menu-hamburger"></span> File
                        </a>
                        <ul className="dropdown-menu">
                            <li><a>Load Table</a></li>
                            <li><a>New Table</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a>Delete Table</a></li>
                            <li role="separator" className="divider"></li>
                            <DataHelperMenu key="imp" type="imp" columnsEmpty={this.isColumnsEmpty()} />
                            <DataHelperMenu key="exp" type="exp" columnsEmpty={this.isColumnsEmpty()} />
                        </ul>
                    </li>
                </ul>;

            calcScoreButton = <ScoreComparison rows={this.props.rows} cols={this.props.cols} optionIdx={this.getOptionNameIdx()} />
        }

        var loginOption =
            <div className="nav navbar-nav navbar-right">
                <li><a href="#"><AccountsUIWrapper /></a></li>
            </div>

        return (
            <div className="container">
                {brandAndTitle}
                <div className="collapse navbar-collapse" id="collapsed-menu">
                    {fileMenu}
                    {editMenu}
                    {calcScoreButton}
                    {loginOption}
                </div>
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
    cols: PropTypes.array,
    rows: PropTypes.array,
    loading: PropTypes.bool
};