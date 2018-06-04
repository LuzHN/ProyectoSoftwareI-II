import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import '../imports/client/styles/register';

//import '../imports/ui/body.js';
//import '../imports/ui/login.css';
import NotFound from '../imports/ui/NotFound';
import Principal from '../imports/ui/Principal';
import Register from '../imports/ui/Register';



const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Principal}/> 
            <Route path="/register" component={Register}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});

