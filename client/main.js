import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




Meteor.startup(function () {



    ReactDOM.render(<Header />, document.getElementById('Header'));
    ReactDOM.render(<Entree />, document.getElementById('SelectedMenu'));
    ReactDOM.render(<ColorStrip />, document.getElementById('ColorStripHeader'));
    ReactDOM.render(<NavigationBar />, document.getElementById('NavigationBar'));
    ReactDOM.render(<ColorStrip />, document.getElementById('ColorStripFooter'));
    ReactDOM.render(<FooterLogo />, document.getElementById('FooterLogo'));
    ReactDOM.render(<FooterInfo />, document.getElementById('FooterInfo'));



});



class Header extends React.Component {

    render() {
        return (
            <h1 id="hk-logo-header"></h1>
        );
    }
}

class FooterLogo extends React.Component {
    render() {
        return (

            <img class = "LogoHK" src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg" alt="Logo" />

        );

    }
}

class FooterInfo extends React.Component {
    render() {
        return (
            <div class="FooterDescription">
                <h3 class="green">Ubicanos</h3>
                <p class="olive">Metrópolis</p>
                <p class="olive">Torre #1</p>
                <p class="olive">Segundo piso</p>
                <p class="olive">Local C212, entre Nativo y Bistro</p>
                <p class = "FooterSN">
                    <a target="_blank" href="https://www.instagram.com/healthkitchenhn/"><ion-icon size = "large" name="logo-instagram"></ion-icon></a>
                    <a target="_blank" href="https://fb.me/healthkitchenhn"><ion-icon name="logo-facebook"></ion-icon></a>
                    <a target="_blank" href="https://twitter.com/healthkitchenhn/"><ion-icon name="logo-twitter"></ion-icon></a>
                </p>
            </div>
        );

    }
}



class NavigationBar extends React.Component { // falta menu de la casa


    render() {
        return (

            <div className="pos-f-t ">

                <nav className="navbar navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span> Menú</span>
                    </button>
                </nav>

                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4 d-flex justify-content-center" id = "BackgroundNavBar">
                        
                        <ul class="list-group" id="PlateList">
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Entree />, document.getElementById('SelectedMenu'));
                                }} >
                                Entradas
                                <span class="badge badge-primary badge-pill">5</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Soups />, document.getElementById('SelectedMenu'));
                                }} >
                                Sopas

                                <span class="badge badge-primary badge-pill">4</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Salads />, document.getElementById('SelectedMenu'));
                                }}>
                                Ensaladas
                                <span class="badge badge-primary badge-pill">5</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Wraps />, document.getElementById('SelectedMenu'));
                                }}>
                                Wraps
                                <span class="badge badge-primary badge-pill">3</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<LittleItaly />, document.getElementById('SelectedMenu'));
                                }}>
                                Little Italy (Pastas & Pizettas)
                                <span class="badge badge-primary badge-pill">10</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Sandwiches />, document.getElementById('SelectedMenu'));
                                }}>
                                Sándwiches
                                <span class="badge badge-primary badge-pill">7</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<SideDish />, document.getElementById('SelectedMenu'));
                                }}>
                                Acompañantes
                                <span class="badge badge-primary badge-pill">3</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Breakfasts />, document.getElementById('SelectedMenu'));
                                }}>
                                Desayunos
                                <span class="badge badge-primary badge-pill">15</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Desserts />, document.getElementById('SelectedMenu'));
                                }}>
                                Postres
                                <span class="badge badge-primary badge-pill">5</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Juices />, document.getElementById('SelectedMenu'));
                                }}>
                                Jugos
                                <span class="badge badge-primary badge-pill">10</span>
                            </a>
                            <a href="#Menu" class="list-group-item d-flex justify-content-between align-items-center"
                                onClick={function () {
                                    ReactDOM.render(<Drinks />, document.getElementById('SelectedMenu'));
                                }}>
                                Bebidas
                                <span class="badge badge-primary badge-pill">11</span>
                            </a>
                            
                        </ul>

                    </div>
                </div>

            </div>


        );
    }
}

class Wraps extends React.Component {
    render() {
        return (
            <CardDeck>

                
                <Card >
                    <CardImg top width="50%" src="" alt="Card image cap" />
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardSubtitle>L </CardSubtitle>
                        <CardText></CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="" alt="Card image cap" />
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardSubtitle>L </CardSubtitle>
                        <CardText></CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="" alt="Card image cap" />
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardSubtitle>L </CardSubtitle>
                        <CardText></CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        );
    }
}

/*
class x extends React.Component {
    render() {
        return (
            <CardDeck>

                
                <Card >
                    <CardImg top width="50%" src="" alt="Card image cap" />
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardSubtitle>L </CardSubtitle>
                        <CardText></CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        );
    }
}
*/

class Salads extends React.Component {
    render() {
        return (

            <CardDeck>

                <Card >
                    <CardImg top width="50%" src="https://simplyhomecooked.com/wp-content/uploads/2016/05/Chopped-caprese-salad-5.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Caprese Salad</CardTitle>
                        <CardSubtitle>L 149 | Pollo Extra: + L 49</CardSubtitle>
                        <CardText>Tomate fresco, cuajada, y albaca marinados al pesto, acompañado con mix de lechugas.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://www.ideahacks.com/wp-content/uploads/2017/08/Mediterranean-Quinoa-Salad.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Quinoa Salad</CardTitle>
                        <CardSubtitle>L 149</CardSubtitle>
                        <CardText>Mezclada con pepino, aceitunas, cebolla y guacamole, servido con tres rebanadas de pan tostado.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://revistamundonatural.com/wordpress/wp-content/uploads/2017/09/ensalada_mediterranea.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Ensalada Mediterranea</CardTitle>
                        <CardSubtitle>L 189 | Pollo Extra: + L 49</CardSubtitle>
                        <CardText>Mix de lechugas, tomates asados, hongos frescos, requesón y carbanzos con vinagreta de ajo rostizado. </CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://www.rebanando.com/media/caesar-salad-source-thinkstock-jpg_crop.jpeg/rh/ensalada-cesar.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Ensalada César</CardTitle>
                        <CardSubtitle>L 189</CardSubtitle>
                        <CardText>Lechuga Romana, queso parmesano, cherry tomatoes, croutons, aderezo césar y pollo al grill.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://www.culinaryhill.com/wp-content/uploads/2017/09/Chipotle-Steak-Recipe-Culinary-Hill-2.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Chipotle Salad</CardTitle>
                        <CardSubtitle>L 189</CardSubtitle>
                        <CardText>Mix de lechugas, aguacate, y pollo con aderezo de chipotle.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>

            </CardDeck>

        );

    }
}

class Soups extends React.Component { // 4 platos
    render() {
        return (

            <CardDeck>

                <Card >
                    <CardImg top width="50%" src="https://comidasperuanas.net/wp-content/uploads/2017/01/Sopa-de-Pollo-Peruana.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Sopa de Pollo HK</CardTitle>
                        <CardSubtitle>L 89</CardSubtitle>
                        <CardText>Caldo clarificado de pollo y vegetales con tallarines.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://estaticos.marie-claire.es/media/cache/680x_thumb/uploads/images/recipe/567925885bafe85dd944606c/interior-wonton-de-pollo.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Sopa de Wonton</CardTitle>
                        <CardSubtitle>L 109</CardSubtitle>
                        <CardText>Caldo ligero de pollo sazonado con soya y sésamo, tallarines y wonton hervido relleno de pollo.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/3/5/1/BX0203H_Cream-of-Fresh-Tomato-Soup_s4x3.jpg.rend.hgtvcom.616.462.suffix/1394079586646.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Creamy Tomatoe</CardTitle>
                        <CardSubtitle>L 99</CardSubtitle>
                        <CardText>Acompañada con dos pupusas rellenas de queso.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg top width="50%" src="http://www.1001consejos.com/wp-content/uploads/2014/03/sopa-de-tortilla.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Sopa de Tortilla</CardTitle>
                        <CardSubtitle>L 129</CardSubtitle>
                        <CardText>Tradicional sopa Azteca con pollo.</CardText>
                        <Button>Ver más</Button>
                    </CardBody>
                </Card>

            </CardDeck>

        );

    }
}





class Entree extends React.Component { // 5 platos
    render() {
        return (

            <section>

                <CardDeck>
                    <Card >
                        <CardImg top width="50%" src="http://cdn1-www.momtastic.com/assets/uploads/2016/06/Cauliflower-Nuggets-4.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Cauliflower Nuggets</CardTitle>
                            <CardSubtitle>L 129</CardSubtitle>
                            <CardText>Empanizado con panco, acompañado de una salsa fresca de tomate y Tzatziki</CardText>
                            <Button>Ver más</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg top width="50%" src="https://www.philadelphia.com.mx/modx/assets/img/revision2016/images/recetas/montaditos_fuerza_roja.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Montaditos</CardTitle>
                            <CardSubtitle>L 99</CardSubtitle>
                            <CardText>Cuatro tostadas de pan de hierbas; atún, vegetales asados, pollo al pesto, y carne de berenjena</CardText>
                            <Button>Ver más</Button>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardImg top width="50%" src="https://www.hogarmania.com/archivos/201105/193-croquetas-de-verduras-y-queso-xl-668x400x80xX.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Croquetas de Vegetales</CardTitle>
                            <CardSubtitle>L 99</CardSubtitle>
                            <CardText>Fritura de carne de berenjena, papa y zanahoria rellos de cuajada y acompañados de Tatziki</CardText>
                            <Button>Ver más</Button>
                        </CardBody>
                    </Card>
                    <Card >
                        <CardImg top width="50%" src="http://www.contigosalud.com/files/images/Palitos%20camote%20francesa.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Palitos de Camote</CardTitle>
                            <CardSubtitle>L 49</CardSubtitle>
                            <CardText>Camotes a la francesa, acompañado de aderezo Tzatziki.</CardText>
                            <Button>Ver más</Button>
                        </CardBody>
                    </Card>
                    <Card >
                        <CardImg top width="50%" src="http://mylatinatable.com/wp-content/uploads/2016/01/foto-heroe-2.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Aros de Cebolla HK</CardTitle>
                            <CardSubtitle>L 89</CardSubtitle>
                            <CardText>5 aros de cebolla rellenos con pure de camote, guacamole y carne de berenjena y Empanizado con panco.</CardText>
                            <Button>Ver más</Button>
                        </CardBody>
                    </Card>

                </CardDeck>
            </section>



        );
    }
}


class ColorStrip extends React.Component {
    render() {
        return (
            <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />
        );
    }
}

