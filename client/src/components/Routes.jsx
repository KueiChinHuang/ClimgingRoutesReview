import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Reviews from './reviews/Index';
import NewReview from './reviews/New';
import EditReview from './reviews/Edit';

function Routes ({user, setUser}) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" render={
                renderProps => <Register
                {...renderProps}
                setUser={setUser}
                />
            }/>
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
            <Route exact path="/reviews" render={
                renderProps => <Reviews
                    {...renderProps}
                    user={user}
                />
            }/>
            <Route exact path="/reviews/new" component={NewReview}/>
            <Route exact path="/reviews/edit" component={EditReview}/>
        </Switch>
    );
}

export default Routes;