import React from 'react'; // eslint-disable-line no-unused-vars
import { Navigation } from '../components/Navigation.jsx'; // eslint-disable-line no-unused-vars
import { Footer } from '../components/Footer.jsx'; // eslint-disable-line no-unused-vars

export const App = ({ children }) => (
  <div className='container'>
    <div>
      <Navigation />
      {children}
    </div>
    <Footer />
  </div>
);
