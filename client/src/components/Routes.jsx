import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';

import Climbingroutes from './climbingroutes/Index';

function Routes ({setUser}) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" render={
                renderProps => <Login 
                    {...renderProps}
                    setUser={setUser}
                />
            }/>
            <Route exact path="/climbingroutes" component={Climbingroutes}/>
        </Switch>
    );
}

export default Routes;