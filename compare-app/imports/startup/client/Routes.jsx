import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'; // eslint-disable-line no-unused-vars

import { App } from '../../ui/layouts/App.jsx';
import { Index } from '../../ui/pages/Index.jsx';
import { NotFound } from '../../ui/pages/NotFound.jsx';
import { One } from '../../ui/pages/One.jsx';
import { Two } from '../../ui/pages/Two.jsx';
import { Hello } from '../../ui/pages/Hello.jsx';
import { Login } from '../../ui/components/Login.jsx';

import SelectTable from '../../ui/components/SelectTable.jsx';
import DisplayTable from '../../ui/components/DisplayTable.jsx';

Meteor.startup(() => {
  let year = new Date().getFullYear() + ' ';
  if (year > 2016) year = '2016 - ' + year;

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/One" component={One} />
        <Route path="/Two" component={Two} />
        <Route path="/Hello/:name" component={Hello} />
        <Route path="/Login" component={ Login } />
        <Route path="/SelectTable" component={ SelectTable } />
        <Route path="/DisplayTable/:tableId" component={ DisplayTable } />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>,
    document.getElementById('react-root'));
});
