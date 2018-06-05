import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {Router, browserHistory } from 'react-router';

import Menu from '../imports/ui/menu'

const routes = (
    <BrowserRouter history = {browserHistory}>
        <Switch history = {browserHistory}>
            <Route path="/menu" exact component={Menu} history = {browserHistory}/>
        </Switch>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});
