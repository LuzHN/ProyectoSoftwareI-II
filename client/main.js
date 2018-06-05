import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {Router, browserHistory } from 'react-router';

import '../imports/client/styles/menu.css';
import Menu from '../imports/client/ui/menu';

const routes = (
    <BrowserRouter history = {browserHistory}>
        <Switch history = {browserHistory}>
            <Route path="/menu" component={Menu} history = {browserHistory}/>
        </Switch>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});



