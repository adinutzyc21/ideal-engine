import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import TableSelect from "./Select/TableSelect.jsx"
import LoginPage from "./Login/LoginPage.jsx"
import MenuBar from "./Menu/MenuBar.jsx"

// Column component - represents columns in the table
class App extends Component {
    /**
    * Initialize state variables and bind this to methods
    */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            showTableSelect: false
        };
        this.asGuest = this.asGuest.bind(this);
    }

    asGuest(){
         this.setState({ showTableSelect: true });
    }
    render() {
        var option = [];

        if (this.props.loading) {
            option.push(
                <div className='table-container table-container-no-data' key="loading">
                    Loading data...
                    <Spinner spinnerName='three-bounce' />
                </div>
            );
        }
        // user exists here
        else{
            // show the table selection page if the user is logged in
            if(this.props.user !== null){
                this.state.showTableSelect=true;
            }
            // show the log in page if the user is not logged in unless he presses skip
            if(!this.state.showTableSelect){
                option.push(
                    <div key = "login" className='table-container table-container-no-data'>
                        <LoginPage />
                        <a role="button" onClick={this.asGuest}>Continue as Guest</a>
                    </div>
                );
            }
            else{
                option.push(<TableSelect  key="select"/>);
            }
        }

        return (
            <div className='react-bs-container-body'>
                <MenuBar/>
                {option}
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object
};

export default createContainer(({ params }) => {
    const user = Meteor.user();

    var loading = true;

    if (user !== undefined) {
        loading = false;
    }

    return {
        user, loading
    };
}, App);