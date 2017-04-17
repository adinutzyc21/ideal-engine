import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';

// import App from '../imports/ui/App.jsx'; // eslint-disable-line no-unused-vars
import TableDisplay from '../imports/ui/display/TableDisplay.jsx'; // eslint-disable-line no-unused-vars

import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  let year = new Date().getFullYear() + ' ';
  if (year > 2016) year = '2016 - ' + year;
  // TODO: replace this by App again
  render(
    <div className='container'>

      <div id='app-container'>
        <TableDisplay tableId='aa3d8fbe5927eb2545dc4ed1' />
      </div>

      <div id='footer-container'>
        <nav className='navbar navbar-default navbar-fixed-bottom'>
          <div className='container' className='pager'>
            Copyright &#169; {year}Adina Stoica. All rights reserved.
          </div>
        </nav>
      </div>

    </div>,
    document.getElementById('render-target'));
});
