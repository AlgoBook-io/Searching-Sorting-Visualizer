import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <BrowserRouter basename='/Searching-Sorting-Visualizer' >
    <div className="App">
      <MainComponent/>
    </div>
    </BrowserRouter>
  );
}

export default App;