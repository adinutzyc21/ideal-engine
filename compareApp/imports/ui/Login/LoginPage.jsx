import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import MenuBar from "../Menu/MenuBar.jsx"

// Column component - represents columns in the table
export default class Login extends Component {
   
    render() {
        return (
            <div>
                Please use the menu to log in if you want to (for now)
            </div>
        );
    }
}
