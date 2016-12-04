import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(
    <div className='container'>
      <header>
        <h1>CompareApp Draft</h1>
      </header>
      <App />
    </div>,
    document.getElementById('render-target'));
});