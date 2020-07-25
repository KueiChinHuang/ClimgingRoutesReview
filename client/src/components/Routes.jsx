import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';

function Routes () {
    return (
        <Switch>
            <Route exect path="/" component={Home}/>
            <Route exect path="/about" component={About}/>
            <Route exect path="/login" component={Login}/>
        </Switch>
    );
}

export default Routes;