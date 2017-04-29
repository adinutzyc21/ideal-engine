import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router'; // eslint-disable-line no-unused-vars

import { App } from '../../ui/layouts/App.jsx';
import Comp from '../../ui/layouts/Comp.jsx';

import { NotFound } from '../../ui/pages/NotFound.jsx';
import { Login } from '../../ui/pages/Login.jsx';

import MenuBar from '../../ui/components/MenuBar.jsx';

import SelectTable from '../../ui/components/SelectTable.jsx';
import { DisplayTable } from '../../ui/components/DisplayTable.jsx';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to="/SelectTable" />
        <Route path='/Login' component={Login} />
        <Route path='/SelectTable' components={{ main: SelectTable, sidebar: MenuBar }} />

        <Route path='/DisplayTable' component={ Comp } >
          <Route path='/DisplayTable/:tableId'
            components={{ main: DisplayTable, sidebar: MenuBar }} />
        </Route>

      </Route>
      <Route path='*' component={NotFound} />
    </Router>,
    document.getElementById('react-root'));
});
