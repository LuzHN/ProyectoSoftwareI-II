import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';


export default class MenuEmpleado extends React.Component {
    

    render() {
        return (
            <div>
                <header id="Header">
                    <h1 id="hk-logo-header"></h1>
                </header>

                <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

                <div className="pos-f-t "></div>

            </div>
        );
    }

}