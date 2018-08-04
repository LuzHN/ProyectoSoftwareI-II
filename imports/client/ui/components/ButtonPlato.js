import React, {Component} from "react";

class ButtonPlato extends Component {
  render() {
    return (
      <div className="btn-bg bg-2">
        <div className="btn btn-2">
          <button href="#" onClick={enviar= (e)=>{
            e.preventDefault();
            if(this.props.texto === "Informacion Nutricional"){
              this.props.onClick();
            }else{
              this.props.onClick(this.props.plato, this.props.precio, this.props.imagen)
            }
          }}>{this.props.texto}</button>
        </div>
      </div>
    );
  }
}

export default ButtonPlato;
