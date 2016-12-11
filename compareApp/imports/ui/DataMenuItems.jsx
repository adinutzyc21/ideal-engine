import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// DataMenuItems component - import from CSV, export to CSV, delete table and auto-populate table
export default class DataMenuItems extends Component {

    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            title: "",
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
                title = "Delete comparison";
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
            { option: "Apartment 1", rent: "$800", deposit: "$200", rating: "70%", distance: "10 mi", size: "720 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 2", rent: "$820", deposit: "$0", rating: "75%", distance: "5 mi", size: "720 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 3", rent: "$750", deposit: "$0", rating: "72%", distance: "8 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 4", rent: "$700", deposit: "$0", rating: "80%", distance: "9 mi", size: "780 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 5", rent: "$810", deposit: "$100", rating: "73%", distance: "11 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 6", rent: "$800", deposit: "$150", rating: "77%", distance: "12 mi", size: "725 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 7", rent: "$820", deposit: "$0", rating: "90%", distance: "11 mi", size: "720 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 8", rent: "$710", deposit: "$0", rating: "92%", distance: "10 mi", size: "770 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 9", rent: "$700", deposit: "$100", rating: "78%", distance: "12 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 10", rent: "$700", deposit: "$100", rating: "79%", distance: "9 mi", size: "760 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 11", rent: "$750", deposit: "$100", rating: "82%", distance: "8 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 12", rent: "$690", deposit: "$150", rating: "84%", distance: "9 mi", size: "810 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 13", rent: "$820", deposit: "$200", rating: "77%", distance: "7 mi", size: "800 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 14", rent: "$850", deposit: "$250", rating: "70%", distance: "11 mi", size: "820 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 15", rent: "$700", deposit: "$100", rating: "78%", distance: "12 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 16", rent: "$700", deposit: "$100", rating: "79%", distance: "9 mi", size: "760 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 17", rent: "$750", deposit: "$100", rating: "82%", distance: "8 mi", size: "750 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 18", rent: "$690", deposit: "$150", rating: "84%", distance: "9 mi", size: "810 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 19", rent: "$820", deposit: "$200", rating: "77%", distance: "7 mi", size: "800 sqft" , neighborhood: "good" , like: "yes" },
            { option: "Apartment 12", rent: "$850", deposit: "$250", rating: "70%", distance: "11 mi", size: "820 sqft" , neighborhood: "good" , like: "yes" },
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