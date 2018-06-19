import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {Router, browserHistory } from 'react-router';


import NotFound from '../imports/ui/NotFound';
import Principal from '../imports/ui/Principal';
import Register from '../imports/ui/Register';
import LoginPage from '../imports/ui/LoginPage';
import EditProfilePage from '../imports/ui/EditProfilePage';
import MenuAdmin from '../imports/ui/MenuAdmin';


const routes = (
    <BrowserRouter history = {browserHistory}>
        <Switch history = {browserHistory}>
            <Route path="/menu" exact component={Principal} history = {browserHistory}/> 
            <Route path="/register" component={Register} history = {browserHistory}/>
            <Route path="/menuAdmin" component={MenuAdmin} history = {browserHistory}/>
            <Route path ="/login" component={LoginPage} history = {browserHistory}/>
            <Route path ="/editProfile" component={EditProfilePage} history = {browserHistory}/>
            <Route path="*" component={NotFound} history = {browserHistory}/>
        </Switch>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});

