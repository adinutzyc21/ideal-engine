import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

// Column component - represents columns in the table
export class Login extends Component {

  render() {
    return (
      <div className='table-container table-container-no-data'>
        Please use the menu to log in if you want to (for now)
      </div>
    );
  }
}
{/*<a role="button" onClick={this.continueAsGuest}>Continue as Guest</a>*/}


  // /**
  //  * Allow the user to continue as a guest
  //  * Sets the showSelectTable state variable to true,
  //  *  allowing the SelectTable screen to be displayed
  //  */
  // continueAsGuest() {
  //   this.setState({ showSelectTable: true });
  // }