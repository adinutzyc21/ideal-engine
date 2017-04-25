import React from 'react'; // eslint-disable-line no-unused-vars
import { IndexLink, Link } from 'react-router'; // eslint-disable-line no-unused-vars

export const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
    <li><Link to="/one" activeClassName="active">Page One</Link></li>
    <li><Link to="/two" activeClassName="active">Page Two</Link></li>
    <li><Link to="/login" activeClassName="active">Log In</Link></li>
    <li><Link to="/select" activeClassName="active">Select Table</Link></li>
  </ul>
);
