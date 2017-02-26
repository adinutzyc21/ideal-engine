import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {

  var year = new Date().getFullYear() + " ";
  if (year > 2016) year = "2016 - " + year;

  render(
    <div className='container'>

      <div id="app-container">
        <App />
      </div>

      <div id="footer-container">
        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container" className="pager">
            Copyright &#169; {year}Adina Stoica. All rights reserved.
          </div>
        </nav>
      </div>

    </div>,
    document.getElementById('render-target'));
});