import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import LandingPage from '../imports/ui/TableSelection/LandingPage.jsx';

Meteor.startup(() => {

  var year = new Date().getFullYear() + " ";
  if (year > 2016) year = "2016 - " + year;

  render(
    <div className='container'>
      <header>
      </header>
      <LandingPage />
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container" className="pager">
          Copyright &#169; {year}Adina Stoica. All rights reserved.
        </div>
      </nav>
    </div>,
    document.getElementById('render-target'));
});