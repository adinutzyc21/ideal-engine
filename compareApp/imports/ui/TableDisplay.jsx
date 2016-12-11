import React, { Component, PropTypes } from 'react';

import Spinner from 'react-spinkit';

import TableHeading from './TableHeading.jsx';
import TableRow from './TableRow.jsx';

// Column component - represents columns in the table
export default class TableDisplay extends Component {
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
        // While the data is loading, show a spinner
        if (this.props.loading) {
            return (
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
            return (
                <div className='table-container table-container-no-data'>
                    <div>No data available. Use the menu to add data.</div>
                </div>
            );
        }

        return (
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
}

/**
  * 
  */
TableDisplay.propTypes = {
    cols: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    loading: PropTypes.bool
};