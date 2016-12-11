import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// DataMenuItems component - import from CSV, export to CSV, delete table and auto-populate table
export default class DataMenuItems extends Component {

    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            title: ["", 5],
            callBack: null
        };
    }
    /**
     * Set state variables that depend on level
     */
    componentDidMount() {
        // set the menu option string and the callback function
        var title = "";
        var callBack = null;
        switch (this.props.type) {
            case "imp":
                title = "Import from CSV";
                callBack = this.importCSV;
                break;
            case "exp":
                title = "Export to CSV";
                callBack = this.exportCSV;
                break;
            case "pop":
                title = "Populate table";
                callBack = this.populateDocument;
                break;
            case "del":
                title = "Delete table";
                callBack = this.deleteDocument;
                break;
        }
        this.setState({
            title: title,
            callBack: callBack
        });
    }
    /**
     * 
     */
    render() {
        // don't allow populate table if there is data in the document
        // don't allow delete data if there isn't data in the document
        if (!this.props.emptyTable && this.props.type === "pop" ||
            this.props.emptyTable && this.props.type === "del") {
            return (
                <li className="disabled">
                    <a role="button">{this.state.title}</a>
                </li>
            );
        }

        return (
            <li>
                <a role="button" onClick={this.state.callBack}>{this.state.title}</a>
            </li>
        );
    }

    deleteDocument() {
        Meteor.call('comparison.deleteAll');
    }
    /**
     * Create the table (for testing purposes)
     */
    populateDocument() {
        var query = [
            {
                option: { value: "Apartment 1", score: 5 },
                rent: { value: "$800", score: 10 }, 
                deposit: {value: "$200", score: 3},
                rating: {value: "70%", score: 2}, 
                distance: {value: "10 mi", score: 4}, 
                size: {value: "720 sqft", score: 7}
            },
            {
                option: { value: "Apartment 1", score: 5 },
                rent: { value: "$800", score: 10 }, 
                deposit: {value: "$200", score: 3},
                rating: {value: "70%", score: 2}, 
                distance: {value: "10 mi", score: 4}, 
                size: {value: "720 sqft", score: 7}
            },
            {
                option: { value: "Apartment 1", score: 5 },
                rent: { value: "$800", score: 10 }, 
                deposit: {value: "$200", score: 3},
                rating: {value: "70%", score: 2}, 
                distance: {value: "10 mi", score: 4}, 
                size: {value: "720 sqft", score: 7}
            },
        ];

        for (var i = 0, len = query.length; i < len; i++) {
            Meteor.call('comparison.insertRow', query[i]);
        }
    }

}

/**
  * data: provides form input
  * type: column/row
  * hasNoData: is there data already in the database
  */
DataMenuItems.propTypes = {
    type: PropTypes.oneOf(['imp', 'exp', 'pop', 'del']).isRequired,
    emptyTable: PropTypes.bool.isRequired,
};