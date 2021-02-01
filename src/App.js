import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/App.scss';
import Catalogue from './components/Catalogue';
import CatDetails from './components/CatDetails';

/**
 * Main application function that will load
 * the components needed for the requirements
 */
export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Catalogue} />
        <Route path="/:id" exact component={CatDetails} />
      </Router>
    </div>
  );
}
