import React from 'react';
import logo from './logo.svg';
import './App.css';
import RPiButtons from './RPiButtons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dine enheter</h1>
        <RPiButtons />
      </header>
    </div>
  );
}

export default App;
