import React from 'react';
import Router from './Router';
import '../App.css';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <main className='container'>
        <Nav/>
        <div className='screen'>
          <Router/>
        </div>
      </main>
    </div>
  );
}

export default App;
