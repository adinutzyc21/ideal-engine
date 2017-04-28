import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

export class App extends Component {
  render() {
    if (this.props.children) {
      return (
        <div className='container'>
          <div>
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <div className='container'>
        <div className="Main">
          {this.props.main}
        </div>
        <div className="Sidebar">
          {this.props.sidebar}
        </div>
      </div>);
  }
}

