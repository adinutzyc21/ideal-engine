import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';
import ReactDOM from 'react-dom';

import { Option, Criterion } from '../../api/comparison.js';

import TableHeading from './TableHeading.jsx';
import TableRow from './TableRow.jsx';
import MenuBar from '../Menu/MenuBar.jsx';


// Column component - represents columns in the table
class TableDisplay extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            height: 50
        };
        // make this available in these methods
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    /**
     * Update dimensions to set table-container width correctly
     */
    updateDimensions() {
        var height = $(window).height() - 120;
        if (height < 150) height = 150;
        this.setState({ height: height });
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        $(".table-container").css('max-height', this.state.height + "px");

        // this is the final view
        var html = [];

        // While the data is loading, show a spinner
        if (this.props.loading) {
            html.push (
                <div className='table-container table-container-no-data'>
                    <div>
                        Loading data...
                    <Spinner spinnerName='three-bounce' />
                    </div>
                </div>
            );
        }

        // If the data is empty, show that there is no data available 
        else if (this.props.rows.length === 0) {
            // clear the residual columns
            Meteor.call('comparison.deleteAll', this.props.tableId);

            html.push(
                <div className='table-container table-container-no-data'>
                    <div>No data available. Use the menu to add data.</div>
                </div>
            );
        }
        // render the loaded table
        else {
            html.push(
                <div className='table-container'>
                    <table>
                        {/* Need a header of type TableHeading */}
                        <TableHeading cols={this.props.cols} />
                        {/* Need a bunch of rows of type  TableRow*/}
                        <TableRow rows={this.props.rows} cols={this.props.cols} />
                    </table>
                </div>
            );
        }

        return (
            <div className='react-bs-container-body'>
                <MenuBar currentView="tableDisplay" rows={this.props.rows} cols={this.props.cols} tableId={this.props.tableId} />
                {html}
            </div>
        );
    }
}

TableDisplay.propTypes = {
    tableId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    rows: PropTypes.array,
    cols: PropTypes.array,
    user: PropTypes.object,
};

export default TableDisplayContainer = createContainer(props => {
    const subscriptionR = Meteor.subscribe('option');
    const loadingR = !subscriptionR.ready();
    const rows = Option.find({ tableId: props.tableId }, { sort: { score: -1 } }).fetch();

    const subscriptionC = Meteor.subscribe('criterion');
    const loadingC = !subscriptionC.ready();

    const cols = Criterion.find({ tableId: props.tableId }).fetch();

    const user = Meteor.user();
    const loadingU = Meteor.user() === undefined;

    const loading = loadingR || loadingC || loadingU;

    return {
        loading, rows, cols,
        user,
    };
}, TableDisplay);
