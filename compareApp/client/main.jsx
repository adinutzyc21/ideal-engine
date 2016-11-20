import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../ui/components/App.jsx';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});