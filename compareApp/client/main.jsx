import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

import TableSelection from '../imports/ui/Select/TableSelect.jsx';

Meteor.startup(() => {

  var year = new Date().getFullYear() + " ";
  if (year > 2016) year = "2016 - " + year;

  render(
    <div className='container'>

      <div id="app-container">
        <TableSelection />
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