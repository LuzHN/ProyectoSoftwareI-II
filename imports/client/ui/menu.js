import React from "react";
import ReactDOM from 'react-dom';
import {
  Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, CardDeck, CardGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menu.css';


export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <header id="Header">
          <h1 id="hk-logo-header"></h1>
        </header>

        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

        <div className="pos-f-t ">

          <nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span> Menú</span>
            </button>
          </nav>

          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4 d-flex justify-content-center" id="BackgroundNavBar">

              <ul className="list-group" id="PlateList">
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    ReactDOM.render(renderPlatos("Entree"), document.getElementById('SelectedMenu'));

                  }} >
                  Entradas
                <span className="badge badge-primary badge-pill">5</span>
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    ReactDOM.render(renderPlatos("Soups"), document.getElementById('SelectedMenu'));

                  }} >
                  Sopas

                <span className="badge badge-primary badge-pill">4</span>
                </a>
                <a href="#SelectedMenu" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    ReactDOM.render(renderPlatos("Salads"), document.getElementById('SelectedMenu'));

                  }}>
                  Ensaladas
                <span className="badge badge-primary badge-pill">5</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Wraps />, document.getElementById('SelectedMenu'));
                    renderPlatos("Wraps");
                  }}>
                  Wraps
                <span className="badge badge-primary badge-pill">3</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<LittleItaly />, document.getElementById('SelectedMenu'));
                    renderPlatos("LittleItaly");
                  }}>
                  Little Italy (Pastas & Pizettas)
                <span className="badge badge-primary badge-pill">10</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Sandwiches />, document.getElementById('SelectedMenu'));
                    renderPlatos("Sandwiches");
                  }}>
                  Sándwiches
                <span className="badge badge-primary badge-pill">7</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<SideDish />, document.getElementById('SelectedMenu'));
                    renderPlatos("SideDish");
                  }}>
                  Acompañantes
                <span className="badge badge-primary badge-pill">3</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Breakfasts />, document.getElementById('SelectedMenu'));
                    renderPlatos("Breakfasts");
                  }}>
                  Desayunos
                <span className="badge badge-primary badge-pill">15</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Desserts />, document.getElementById('SelectedMenu'));
                    renderPlatos("Desserts");
                  }}>
                  Postres
                <span className="badge badge-primary badge-pill">5</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Juices />, document.getElementById('SelectedMenu'));
                    renderPlatos("Juices");
                  }}>
                  Jugos
                <span className="badge badge-primary badge-pill">10</span>
                </a>
                <a href="#" className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={function () {
                    //ReactDOM.render(<Drinks />, document.getElementById('SelectedMenu'));
                    renderPlatos("Drinks");
                  }}>
                  Bebidas
                <span className="badge badge-primary badge-pill">11</span>
                </a>

              </ul>

            </div>
          </div>

        </div>

        <section id="Menu">
          <div id="SelectedMenu"> </div>
        </section>


        <img id="ColorStrip" src="http://www.healthkitchen.hn/static/media/color-strip.9c28b147.svg" />

        <footer id="Footer">
          <img className="LogoHK" src="http://www.healthkitchen.hn/static/media/hk-logo.b8b1c147.svg" alt="Logo" />

          <div className="FooterDescription">
            <h3 className="green">Ubicanos</h3>
            <p className="olive">Metrópolis</p>
            <p className="olive">Torre #1</p>
            <p className="olive">Segundo piso</p>
            <p className="olive">Local C212, entre Nativo y Bistro</p>
            <p className="FooterSN">
              <a target="_blank" href="https://www.instagram.com/healthkitchenhn/"><ion-icon size="large" name="logo-instagram"></ion-icon></a>
              <a target="_blank" href="https://fb.me/healthkitchenhn"><ion-icon name="logo-facebook"></ion-icon></a>
              <a target="_blank" href="https://twitter.com/healthkitchenhn/"><ion-icon name="logo-twitter"></ion-icon></a>
            </p>
          </div>
        </footer>


      </div>

    );
  }
}

/*
Template



*/

function renderPlatos(nombrePlato) {

  let jsx = "";

  switch (nombrePlato) {
    case "Entree": {

      jsx = (<CardDeck>
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

      </CardDeck>);
      break;
    } //fin case 1
    case "Soups": {

      jsx = (<CardDeck>

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

      </CardDeck>);
      break;

    } //fin case 2
    case "Salads": {

      jsx = (<CardDeck>

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

      </CardDeck>);
      break;

    } // fin case 3
  }

  return jsx;
}
