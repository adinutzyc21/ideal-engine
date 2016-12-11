import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Meteor.startup(() => {
  render(
    <div className='container'>
      <header>
      </header>
      <App />
    </div>,
    document.getElementById('render-target'));
});