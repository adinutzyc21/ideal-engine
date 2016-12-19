import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import TableDisplay from './TableDisplay.jsx';
import DataInsert from './DataInsert.jsx';

import { Option, Criterion } from '../api/comparison.js'

import { Meteor } from 'meteor/meteor';
import MenuBar from './MenuBar.jsx';

// App component - represents the whole app
class App extends Component {
    /**
     * Render the data
     */
    render() {
        var year = new Date().getFullYear() + " ";
        if (year > 2016) year = "2016 -" + year;

        if (!this.props.loading){
            console.log("you are " + this.props.user.username);
        }

        // Show the app
        return (
            <div className='react-bs-container-body'>
                <MenuBar cols={this.props.cols} rows={this.props.rows} loading={this.props.loading} />
                <TableDisplay cols={this.props.cols} rows={this.props.rows} loading={this.props.loading} />
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container" className="pager">
                        Copyright &#169; {year}Adina Stoica. All rights reserved.
                    </div>
                </nav>
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    cols: PropTypes.array.isRequired,
    user: PropTypes.object,
};

export default createContainer(({ params }) => {
    const subscriptionR = Meteor.subscribe('option');
    const loadingR = !subscriptionR.ready();
    const rows = Option.find({}, { sort: { score: -1 } }).fetch();

    const subscriptionC = Meteor.subscribe('criterion');
    const loadingC = !subscriptionC.ready();
    const cols = Criterion.find().fetch();

    const user = Meteor.user();
    const loadingU = Meteor.user() === undefined;

    const loading = loadingR || loadingC || loadingU;

    return {
        loading, rows, cols,
        user,
    };
}, App);

