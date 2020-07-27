import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Climbingroutes from './climbingroutes/Index';
import NewClimbingroute from './climbingroutes/New';
import EditClimbingroute from './climbingroutes/Edit';

function Routes ({user, setUser}) {
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
            <Route exact path="/logout" render={
                renderProps => <Logout 
                    {...renderProps}
                    setUser={setUser}
                />
            }/>
            <Route exact path="/climbingroutes" render={
                renderProps => <Climbingroutes
                    {...renderProps}
                    user={user}
                />
            }/>
            <Route exact path="/climbingroutes/new" component={NewClimbingroute}/>
            <Route exact path="/climbingroutes/edit" component={EditClimbingroute}/>
        </Switch>
    );
}

export default Routes;