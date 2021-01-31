import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/App.scss';
import Home from './components/Home';
import Cat from './components/Cat';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:id" exact component={Cat} />
      </Router>
    </div>
  );
}
