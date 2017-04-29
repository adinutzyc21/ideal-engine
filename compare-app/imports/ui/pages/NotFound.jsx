import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

/**
 * A simple component to render when we visit the index route / of our application.
 */
export class NotFound extends Component {
  render() {
    return <div id="not-found">
      <div className="not-found-image">
        <img src="/img/404.svg" alt="" />
      </div>
      <div className="not-found-title">
        <h1>Sorry, that page doesn't exist</h1>
        <a href="/" className="gotohomepage">Go to home</a>
      </div>
    </div>;
  }
}
