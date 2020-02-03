import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <HashRouter >
    <div className="App">
      <MainComponent/>
    </div>
    </HashRouter>
  );
}

export default App;