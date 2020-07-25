import React from 'react';
import Routes from './Routes';
import Nav from './shared/Nav';


function App() {
  return (
    <div>
      <React.Fragment>
        <Nav/>
        <Routes/>
      </React.Fragment>
    </div>
  );
}

export default App;
