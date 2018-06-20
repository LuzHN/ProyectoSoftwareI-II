import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {Router, browserHistory } from 'react-router';


import '../imports/client/styles/menu.css';
import Menu from '../imports/client/ui/menu';

import '../imports/client/styles/register';
import NotFound from '../imports/ui/NotFound';
import Principal from '../imports/ui/Principal';
import Register from '../imports/ui/Register';
import LoginPage from '../imports/ui/LoginPage';

import '../imports/client/styles/cart.css';
import Cart from '../imports/ui/Cart';

class Hk extends React.Component{
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false};
  }

  render(){
    const routes = (
      <BrowserRouter history = {browserHistory}>
        <Switch history = {browserHistory}>
          <Route path="/menu" component={Menu} history = {browserHistory}/>
          <Route path="/register" component={Register} history = {browserHistory}/>
          <Route path ="/login" component={LoginPage} history = {browserHistory}/>
          <Route path="/cart" component={Cart} history = {browserHistory}/>
          <Route path="*" component={NotFound} history = {browserHistory}/>
        </Switch>
      </BrowserRouter>
    );
    const isLogIn = this.state.isLoggedIn;
    let ref;
    if(isLogIn){
      ref = <li className="nav-item"><a className="nav-link" href="/cart">Cart<i className="fas fa-shopping-cart"></i></a>
            </li>
    }else{
      ref = <li className="nav-item"><a className="nav-link" href="/login">LogIn/SingUp</a>
            </li>
    }
    return(
      <div>
      <nav className="navbar fixed-top navbar-expand-lg ">
        <a className="navbar-brand" href="/menu"><div className="img"></div></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li className="nav-item"><a className="nav-link" href="/menu">Menu</a></li>
            {ref}
          </ul>
        </div>
      </nav>
      {routes}
    </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Hk/>, document.getElementById('app'));
});
