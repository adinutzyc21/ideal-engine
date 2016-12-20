import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import { Tables } from '../../api/tables.js'

import MenuBar from '../MenuBar.jsx';
import AllTables from './AllTables.jsx'

// LandingPage component - this is where the user logs in and creates / selects a table to work on
class LandingPage extends Component {
    /**
     * Render the data
     */
    render() {
        // Show the app
        return (
            <div className='react-bs-container-body'>
                <MenuBar cols={[]} rows={[]} loading={false} />

                <AllTables tables={this.props.tables} loading={this.props.loading} />

            </div>
        );
    }
}

LandingPage.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    tables: PropTypes.array,
};

export default createContainer(({ params }) => {
    const user = Meteor.user();

    const subscription = Meteor.subscribe('tables');
    var loading = !subscription.ready();
    var tables;

    if (user === null || user === undefined) {
        tables = Tables.find({ isPublic: true }).fetch();
    } else {
        tables = Tables.find({ $or: [{ isPublic: true }, { owner: user.username }] }, 
        { sort: { isPublic: 1, lastModified: -1 } }).fetch();
    }
    if (user === undefined) {
        loading = true;
    }

    return {
        user, tables, loading
    };
}, LandingPage);

