import React from 'react';
import logo from './logo.svg';
import './App.css';
import RPiButtons from './RPiButtons';

function App() {
  return (
    <div className="bg-background text-text">
        <h1 className="text-7xl">Dine enheter</h1>
        <RPiButtons />
    </div>
  );
}

export default App;
