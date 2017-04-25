import React from 'react';  // eslint-disable-line no-unused-vars

export const Hello = ({ params, location }) => (
  <div className='table-container table-container-no-data'>
    <h3>Howdy, { params.name }! You like { location.query.food }.</h3>
  </div>
);
