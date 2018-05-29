import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




Meteor.startup(function () {



    let jsx = <Carde />;
    ReactDOM.render(jsx, document.getElementById('App'));


});

class Carde extends React.Component {
    render() {
        return (


            <CardColumns>
                <Card>
                    <CardImg top width="50%" src="http://www.syngenta-us.com/seeds/vegetables/images/leafy/abilene.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Big lettuce</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" src="https://imgix.bustle.com/rehost/2017/5/25/86dc3e78-9463-497c-be93-f0013516fe26.jpg" alt="Card image cap" />
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Carne cruda</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Button</Button>
                </Card>
                <Card>
                    <CardImg top width="500%" src="http://allure.vanguardngr.com/wp-content/uploads/2016/08/fish.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Pescado</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card body inverse color="primary">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                </Card>
            </CardColumns>


        );
    }
}

class App extends React.Component {

    render() {
        return (
            <Alert bsStyle="warning">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
                good.
            </Alert>


        );
    }
}

