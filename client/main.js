import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


//import '../imports/ui/body.js';
//import '../imports/ui/login.css';
import NotFound from '../imports/ui/NotFound';
import Principal from '../imports/ui/Principal';
import Register from '../imports/ui/Register';
import LoginPage from '../imports/ui/LoginPage';

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Principal}/> 
            <Route path="/register" component={Register}/>
            <Route path ="/login" component={LoginPage}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});
