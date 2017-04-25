import React from 'react';  // eslint-disable-line no-unused-vars

export const Hello = ({ params, location }) => (
  <h3>Howdy, { params.name }! You like { location.query.food }.</h3>
);
