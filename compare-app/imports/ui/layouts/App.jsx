import React from 'react'; // eslint-disable-line no-unused-vars
import MenuBar from '../components/MenuBar.jsx'; // eslint-disable-line no-unused-vars
import { Footer } from '../components/Footer.jsx'; // eslint-disable-line no-unused-vars

export const App = ({ children }) => (
  <div className='container'>
    <div>
      <MenuBar />
      {children}
    </div>
    <Footer />
  </div>
);
