import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import { Option, Criterion } from '../../api/comparison.js'

import MenuBar from '../MenuBar.jsx';

// LandingPage component - this is where the user logs in and creates / selects a table to work on
class LandingPage extends Component {
    /**
     * Render the data
     */
    render() {
        if(this.props.user===undefined){
            alert("undefined")
        }
        else if(this.props.user===null){
            alert("null")
        }
        else{
            alert(this.props.user.username);
        }
        // Show the app
        return (
            <div className='react-bs-container-body'>
                <MenuBar cols={[]} rows={[]} loading={false} />
            </div>
        );
    }
}

LandingPage.propTypes = {
    user: PropTypes.object,
};

export default createContainer(({ params }) => {
    const user = Meteor.user();

    return {
        user,
    };
}, LandingPage);

