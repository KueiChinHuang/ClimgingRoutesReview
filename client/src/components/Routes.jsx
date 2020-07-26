import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';

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
        </Switch>
    );
}

export default Routes;