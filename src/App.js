import logo from './logo.svg';
import './App.css';
import HomeWrapper from './components/HomeWrapper';
import {useState} from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="hd-logo">VISIONCORS</h3>      
      </header>

      <main className="App-main">
        <HomeWrapper/>
      </main>
      
    </div>
  );
}

export default App;
