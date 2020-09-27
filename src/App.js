import React from 'react';
import './App.css';
import SpaceFilters from './Filters/SpaceFilters';

function App() {
  return (
    <div className="App">
        <header className="title" aria-label="SpaceX Launch Programs">SpaceX Launch Programs</header>
      <SpaceFilters></SpaceFilters>
    </div>
  );
}

export default App;
