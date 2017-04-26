import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'; // eslint-disable-line no-unused-vars

import { App } from '../../ui/layouts/App.jsx';
import { NotFound } from '../../ui/pages/NotFound.jsx';
import { Login } from '../../ui/pages/Login.jsx';

import SelectTable from '../../ui/components/SelectTable.jsx';
import DisplayTable from '../../ui/components/DisplayTable.jsx';

Meteor.startup(() => {
  let year = new Date().getFullYear() + ' ';
  if (year > 2016) year = '2016 - ' + year;

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ SelectTable } />
        <Route path="/Login" component={ Login } />
        <Route path="/SelectTable" component={ SelectTable } />
        <Route path="/DisplayTable/:tableId" component={ DisplayTable } />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>,
    document.getElementById('react-root'));
});
