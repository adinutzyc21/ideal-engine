import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

export class Footer extends Component {
  render() {
    let year = new Date().getFullYear() + ' ';
    if (year > 2016) year = '2016 - ' + year;

    return <div id='footer-container'>
      <nav className='navbar navbar-default navbar-fixed-bottom'>
        <div className='container' className='pager'>
          Copyright &#169; {year}Adina Stoica. All rights reserved.
          </div>
      </nav>
    </div>;
  }
}
