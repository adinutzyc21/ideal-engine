import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import DataInsert from './DataInsert.jsx';

import ComputeScore from './ComputeScore.jsx'
import TableSelect from '../Select/TableSelect.jsx';
import TableCreate from '../Select/TableCreate.jsx';

// Column component - represents columns in the table
export default class MenuBar extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            currentView: "loadTable"
        };

        // make this available in these methods
        this.isActive = this.isActive.bind(this);
        this.loadTable = this.loadTable.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
    }

    componentDidMount() {
        if (this.props.rows !== undefined) {
            this.setState({ currentView: "tableDisplay" });
        }
    }

    loadTable() {
        ReactDOM.render(<TableSelect />, document.getElementById('app-container'));
        this.setState({ currentView: "loadTable" });
    }

    isActive(menuString) {
        return menuString === this.state.currentView ? "active" : "default";
    }

    isEmpty() {
        return this.props.cols.length === 0 && this.props.rows.length === 0;
    }

    getOptionNameId() {
        if (this.props.cols.length === 0) return "";
        return this.props.cols[0]._id;
    }

    isDisabled(menuString) {
        switch (menuString) {
            case "populateTable":
                if (!this.isEmpty())
                    return "disabled";
                break;
            case "emptyTable":
                if (this.isEmpty())
                    return "disabled";
                break;
            case "addCol":
                if (this.isEmpty())
                    return "disabled";
            default:
                return "default";
        }

    }

    deleteDocument() {
        Meteor.call('comparison.deleteAll');
    }
    /**
     * Create the table (for testing purposes)
     */
    populateDocument() {
        var rows = [
            [
                { value: "Apartment 1" },
                { value: "$800", score: 1 },
                { value: "$200", score: 3 },
                { value: "70%", score: 1 },
                { value: "10 mi", score: 4 },
                { value: "720 sqft", score: 1 }
            ], [
                { value: "Apartment 2" },
                { value: "$780", score: 10 },
                { value: "$100", score: 3 },
                { value: "78%", score: 2 },
                { value: "12 mi", score: 4 },
                { value: "780 sqft", score: 7 }
            ], [
                { value: "Apartment 3" },
                { value: "$720", score: 9 },
                { value: "$50", score: 4 },
                { value: "79%", score: 4 },
                { value: "2 mi", score: 10 },
                { value: "780 sqft", score: 7 }
            ], [
                { value: "Apartment 4" },
                { value: "$700", score: 4 },
                { value: "$0", score: 5 },
                { value: "58%", score: 1 },
                { value: "2 mi", score: 2 },
                { value: "780 sqft", score: 7 }
            ], [
                { value: "Apartment 5" },
                { value: "$700", score: 6 },
                { value: "$150", score: 2 },
                { value: "89%", score: 2 },
                { value: "15 mi", score: 2 },
                { value: "880 sqft", score: 2 }
            ]
        ];

        var cols = [
            { name: "Option Name" },
            { name: "The Rent", score: 9 },
            { name: "My Deposit", score: 2 },
            { name: "Rating", score: 7 },
            { name: "Distance to Work", score: 5 },
            { name: "Size", score: 8 },
        ];

        Meteor.call('comparison.populateTables', cols, rows);
    }

    createHtml() {
        // always show the brand and title 
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

        // and the login option
        var loginOption =
            <div className="nav navbar-nav navbar-right">
                <li><a href="#"><AccountsUIWrapper /></a></li>
            </div>

        var fileMenu =
            <ul className="nav navbar-nav">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                        <span className="glyphicon glyphicon-menu-hamburger"></span> File
                    </a>
                    <ul className="dropdown-menu">
                        <li role="button" className={this.isActive("loadTable")}>
                            <a role="button" onClick={this.loadTable}>Load Table</a></li>
                        <li role="button" className={this.isActive("newTable")}><TableCreate /></li>
                    </ul>
                </li>
            </ul>;


        // <li role="button" className={this.isActive("importCSV")}><a role="button">Import from CSV</a></li>
        // <li><a role="button">Export to CSV</a></li>
        // <li><a>Delete Table</a></li>

        var editMenu = <div></div>;
        var calcScoreButton = <div></div>;

        if (this.props.cols !== undefined && this.props.rows !== undefined) {
            editMenu =
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                            <span className="glyphicon glyphicon-pencil"></span> Edit
                        </a>
                        <ul className="dropdown-menu">
                            <li className={this.isDisabled("addRow")}><DataInsert key="row" level="row" data={this.props.cols} /></li>
                            <li className={this.isDisabled("addCol")}><DataInsert key="col" level="col" data={this.props.rows} optionIdx={this.getOptionNameId()} /></li>
                            <li role="separator" className="divider"></li>
                            <li className={this.isDisabled("emptyTable")}><a role="button" onClick={this.deleteDocument}>Empty table</a></li>
                            <li className={this.isDisabled("populateTable")}><a role="button" onClick={this.populateDocument}>Populate table</a></li>
                        </ul>
                    </li>
                </ul>;

            if (!this.isEmpty()) {
                calcScoreButton = <ComputeScore rows={this.props.rows} cols={this.props.cols} optionIdx={this.getOptionNameId()} />
            }
        }

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
};