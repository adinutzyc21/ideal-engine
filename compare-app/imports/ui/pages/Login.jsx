import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

// Column component - represents columns in the table
export class Login extends Component {

  render() {
    return <div id="not-found">
        <div className="not-found-title">
          <h1>This will be a Log In Page...</h1>
          <a href="/" className="gotohomepage">Go to home</a>
        </div>
      </div>;
  }
}

// <a role="button" onClick={this.continueAsGuest}>Continue as Guest</a>
  // /**
  //  * Allow the user to continue as a guest
  //  * Sets the showSelectTable state variable to true,
  //  *  allowing the SelectTable screen to be displayed
  //  */
  // continueAsGuest() {
  //   this.setState({ showSelectTable: true });
  // }
