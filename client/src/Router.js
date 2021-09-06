import React from 'react';
import Chat from './Chat';
import Login from './Login';
import { Route, Switch } from 'react-router';

const MainRouter = props => {

    return (
        <Switch>
            {/* Main routes */}
            <Route exact path='/'>
                <Login {...props} />
            </Route>
            <Route exact path='/chat/:room'>
                <Chat {...props} />
            </Route>
            {/* Not found Route */}
            <Route >
                <h1>Item Not found</h1>
            </Route>
        </Switch>
    );
};

export default MainRouter;